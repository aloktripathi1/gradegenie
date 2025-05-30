"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, RefreshCw, AlertTriangle, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { courseData } from "@/lib/course-data"
import { calculateScore } from "@/lib/calculate-score"
import { assignGrade } from "@/lib/grade-utils"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { motion, AnimatePresence } from "framer-motion"
import type { FormField } from "@/lib/types"

export default function CourseGradeCalculator() {
  const [degree, setDegree] = useState<string>("data-science")
  const [level, setLevel] = useState<string>("foundation")
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [formValues, setFormValues] = useState<Record<string, number>>({})
  const [bonusMarks, setBonusMarks] = useState<number>(0)
  const [result, setResult] = useState<{
    score: number | null
    finalScore: number | null
    grade: string | null
    formula: string | null
    bonusApplied: boolean
    formulaBreakdown: string | null
    componentScores: Record<string, { value: number; weight: number; contribution: number }> | null
  }>({
    score: null,
    finalScore: null,
    grade: null,
    formula: null,
    bonusApplied: false,
    formulaBreakdown: null,
    componentScores: null,
  })
  const [error, setError] = useState<string | null>(null)
  const [showBonusInput, setShowBonusInput] = useState<boolean>(false)

  // Filter courses based on selected degree and level
  const filteredCourses = courseData.filter((course) => course.degree === degree && course.level === level)

  // Reset form when degree or level changes
  useEffect(() => {
    setSelectedCourse("")
    setFormFields([])
    setFormValues({})
    setBonusMarks(0)
    setResult({
      score: null,
      finalScore: null,
      grade: null,
      formula: null,
      bonusApplied: false,
      formulaBreakdown: null,
      componentScores: null,
    })
    setError(null)
    setShowBonusInput(false)
  }, [degree, level])

  // Update form fields when course changes
  useEffect(() => {
    if (selectedCourse) {
      const course = courseData.find((c) => c.id === selectedCourse)
      if (course) {
        setFormFields(course.formFields)
        // Initialize form values
        const initialValues: Record<string, number> = {}
        course.formFields.forEach((field) => {
          initialValues[field.id] = 0
        })
        setFormValues(initialValues)
        setResult({
          score: null,
          finalScore: null,
          grade: null,
          formula: course.formula,
          bonusApplied: false,
          formulaBreakdown: null,
          componentScores: null,
        })
        setShowBonusInput(false)
      }
    }
  }, [selectedCourse])

  const handleInputChange = (fieldId: string, value: string) => {
    const numValue = value === "" ? 0 : Number(value)

    // Validate input
    if (numValue < 0) {
      setError(`${fieldId} cannot be negative`)
      return
    }

    // Check if the value exceeds the max for this field
    const field = formFields.find((f) => f.id === fieldId)
    if (field && numValue > field.max) {
      setError(`${field.label} cannot exceed ${field.max}`)
      return
    }

    setError(null)
    setFormValues({
      ...formValues,
      [fieldId]: numValue,
    })
  }

  const handleBonusChange = (value: string) => {
    const numValue = value === "" ? 0 : Number(value)

    // Validate bonus input
    if (numValue < 0) {
      setError("Bonus marks cannot be negative")
      return
    }

    if (numValue > 5) {
      setError("Bonus marks cannot exceed 5")
      return
    }

    setError(null)
    setBonusMarks(numValue)
  }

  const calculateGrade = () => {
    // Validate all inputs
    for (const field of formFields) {
      if (formValues[field.id] > field.max) {
        setError(`${field.label} cannot exceed ${field.max}`)
        return
      }
    }

    setError(null)

    const course = courseData.find((c) => c.id === selectedCourse)
    if (!course) return

    try {
      // Calculate score without bonus
      const initialScore = calculateScore(course.id, formValues)

      // Determine if bonus should be applied
      const bonusApplied = initialScore >= 40

      // Show bonus input if score is ≥ 40
      setShowBonusInput(bonusApplied)

      // Calculate final score with bonus if applicable
      let finalScore = initialScore
      if (bonusApplied && bonusMarks > 0) {
        finalScore = Math.min(100, initialScore + bonusMarks)
      }

      // Assign grade
      const grade = assignGrade(finalScore)

      // Generate formula breakdown
      const formulaBreakdown = generateFormulaBreakdown(
        course.id,
        formValues,
        initialScore,
        finalScore,
        bonusApplied,
        bonusMarks,
      )

      // Generate component scores for visual breakdown
      const componentScores = generateComponentScores(course, formValues, initialScore, bonusApplied ? bonusMarks : 0)

      setResult({
        score: initialScore,
        finalScore: finalScore,
        grade: grade,
        formula: course.formula,
        bonusApplied: bonusApplied && bonusMarks > 0,
        formulaBreakdown: formulaBreakdown,
        componentScores: componentScores,
      })
    } catch (err) {
      setError("Error calculating grade. Please check your inputs.")
    }
  }

  const generateFormulaBreakdown = (
    courseId: string,
    values: Record<string, number>,
    initialScore: number,
    finalScore: number,
    bonusApplied: boolean,
    bonus: number,
  ): string => {
    const course = courseData.find((c) => c.id === courseId)
    if (!course) return ""

    let breakdown = `Formula: ${course.formula}\n\n`
    breakdown += "Calculation:\n"

    // Add each component with its value
    for (const field of course.formFields) {
      breakdown += `${field.label} (${field.id}) = ${values[field.id]}\n`
    }

    breakdown += `\nInitial Score (T) = ${initialScore.toFixed(2)}\n`

    if (bonus > 0) {
      breakdown += `Bonus Marks = ${bonus}\n`
      if (bonusApplied) {
        breakdown += `Bonus Applied: Yes (T ≥ 40)\n`
        breakdown += `Final Score = ${initialScore.toFixed(2)} + ${bonus} = ${finalScore.toFixed(2)}\n`
      } else {
        breakdown += `Bonus Applied: No (T < 40)\n`
        breakdown += `Final Score = ${initialScore.toFixed(2)}\n`
      }
    } else {
      breakdown += `Final Score = ${initialScore.toFixed(2)}\n`
    }

    return breakdown
  }

  // This is a simplified approach to generate component scores
  // In a real implementation, you would need to analyze the formula more carefully
  const generateComponentScores = (
    course: any,
    values: Record<string, number>,
    totalScore: number,
    bonus: number,
  ): Record<string, { value: number; weight: number; contribution: number }> => {
    const componentScores: Record<string, { value: number; weight: number; contribution: number }> = {}

    // Estimate weights based on the course formula
    // This is a simplified approach and might not be accurate for all formulas
    const estimatedWeights: Record<string, number> = {}

    // Assign estimated weights based on course ID patterns
    if (course.id.includes("python") || course.id === "python-es") {
      estimatedWeights["GAA1"] = 0.1
      estimatedWeights["GAA2"] = 0.1
      estimatedWeights["Qz1"] = 0.1
      estimatedWeights["F"] = 0.4
      estimatedWeights["PE1"] = 0.15
      estimatedWeights["PE2"] = 0.15
    } else if (course.id.includes("lab")) {
      // For lab courses, split weights evenly
      course.formFields.forEach((field: FormField) => {
        estimatedWeights[field.id] = 1 / course.formFields.length
      })
    } else {
      // Default weights for standard courses
      estimatedWeights["GAA"] = 0.1
      estimatedWeights["Qz1"] = 0.2
      estimatedWeights["Qz2"] = 0.2
      estimatedWeights["F"] = 0.5
      // Add other fields with small weights
      course.formFields.forEach((field: FormField) => {
        if (!estimatedWeights[field.id]) {
          estimatedWeights[field.id] = 0.05
        }
      })
    }

    // Calculate contribution for each component
    course.formFields.forEach((field: FormField) => {
      const value = values[field.id] || 0
      const weight = estimatedWeights[field.id] || 0.1
      const contribution = value * weight

      componentScores[field.id] = {
        value,
        weight,
        contribution,
      }
    })

    // Add bonus if applicable
    if (bonus > 0) {
      componentScores["Bonus"] = {
        value: bonus,
        weight: 1,
        contribution: bonus,
      }
    }

    return componentScores
  }

  const resetCalculator = () => {
    // Reset form values but keep the selected course
    const initialValues: Record<string, number> = {}
    formFields.forEach((field) => {
      initialValues[field.id] = 0
    })
    setFormValues(initialValues)
    setBonusMarks(0)
    setResult({
      score: null,
      finalScore: null,
      grade: null,
      formula: result.formula,
      bonusApplied: false,
      formulaBreakdown: null,
      componentScores: null,
    })
    setError(null)
    setShowBonusInput(false)
  }

  return (
    <Card className="w-full shadow-lg bg-gray-800 border-gray-700">
      <CardContent className="p-6 space-y-6">
        {/* Course Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="degree" className="text-gray-300 mb-2 block">
              Degree
            </Label>
            <Select value={degree} onValueChange={setDegree}>
              <SelectTrigger id="degree" className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="data-science" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                  Data Science
                </SelectItem>
                <SelectItem value="electronic-systems" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                  Electronic Systems
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="level" className="text-gray-300 mb-2 block">
              Level
            </Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level" className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="foundation" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                  Foundation
                </SelectItem>
                <SelectItem value="diploma" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                  Diploma
                </SelectItem>
                <SelectItem value="degree" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                  Degree
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="course" className="text-gray-300 mb-2 block">
              Course
            </Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger id="course" className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 max-h-[300px]">
                {filteredCourses.map((course) => (
                  <SelectItem
                    key={course.id}
                    value={course.id}
                    className="text-gray-200 focus:bg-gray-600 focus:text-white"
                  >
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-red-200">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Fields */}
        <AnimatePresence>
          {selectedCourse && formFields.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {formFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label htmlFor={field.id} className="text-gray-300">
                        {field.label}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-500 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                            <p>
                              {field.description} (Max: {field.max})
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id={field.id}
                      type="number"
                      min="0"
                      max={field.max}
                      placeholder={`0-${field.max}`}
                      value={formValues[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}

                {/* Bonus Marks - Only show if score is ≥ 40 or result exists */}
                <AnimatePresence>
                  {(showBonusInput || result.score !== null) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-1">
                        <Label htmlFor="bonus" className="text-gray-300">
                          Bonus Marks
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-500 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                              <p>Bonus marks (out of 5) are applied only if your total score is ≥ 40</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="bonus"
                        type="number"
                        min="0"
                        max="5"
                        placeholder="0-5"
                        value={bonusMarks || ""}
                        onChange={(e) => handleBonusChange(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  className="flex items-center gap-1 bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                >
                  <RefreshCw className="h-4 w-4" /> Reset
                </Button>
                <Button onClick={calculateGrade} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Calculator className="mr-2 h-4 w-4" /> Calculate Grade
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result.grade && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6 space-y-6"
            >
              {/* Grade Display */}
              <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 shadow-lg">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Your Grade</h3>
                <div className="text-6xl font-bold mb-4" style={{ color: getGradeColor(result.grade) }}>
                  {result.grade}
                </div>
                <div className="grid grid-cols-2 gap-8 w-full max-w-xs text-center">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Initial Score</p>
                    <p className="text-2xl font-semibold text-gray-200">{result.score?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Final Score</p>
                    <p className="text-2xl font-semibold text-gray-200">{result.finalScore?.toFixed(2)}</p>
                    {result.bonusApplied && <p className="text-xs text-green-400">(+{bonusMarks} Bonus)</p>}
                  </div>
                </div>
              </div>

              {/* Visual Score Breakdown */}
              {result.componentScores && (
                <ScoreBreakdown componentScores={result.componentScores} totalScore={result.finalScore || 0} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

function getGradeColor(grade: string | null): string {
  if (!grade) return "#9CA3AF" // gray-400

  switch (grade) {
    case "S":
      return "#10B981" // emerald-500
    case "A":
      return "#34D399" // emerald-400
    case "B":
      return "#3B82F6" // blue-500
    case "C":
      return "#60A5FA" // blue-400
    case "D":
      return "#F59E0B" // amber-500
    case "E":
      return "#FBBF24" // amber-400
    case "F":
      return "#EF4444" // red-500
    default:
      return "#9CA3AF" // gray-400
  }
}
