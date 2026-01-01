"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calculator,
  RefreshCw,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  Sparkles,
  GraduationCap,
  ChevronRight,
  Star,
  Lightbulb,
  Flame,
  Zap,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { courseData } from "@/lib/course-data"
import { calculateScore } from "@/lib/calculate-score"
import { assignGrade } from "@/lib/grade-utils"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { motion, AnimatePresence } from "framer-motion"
import type { FormField } from "@/lib/types"

export default function GradeCalculator() {
  const [degree, setDegree] = useState<string>("data-science")
  const [level, setLevel] = useState<string>("foundation")
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [formValues, setFormValues] = useState<Record<string, number | null>>({})
  const [result, setResult] = useState<{
    score: number | null
    grade: string | null
    formula: string | null
    formulaBreakdown: string | null
    componentScores: Record<string, { value: number; weight: number; contribution: number }> | null
  }>({
    score: null,
    grade: null,
    formula: null,
    formulaBreakdown: null,
    componentScores: null,
  })
  const [error, setError] = useState<string | null>(null)

  // Filter courses based on selected degree and level
  const filteredCourses = courseData.filter((course) => course.degree === degree && course.level === level)

  // Reset form when degree or level changes
  useEffect(() => {
    setSelectedCourse("")
    setFormFields([])
    setFormValues({})
    setResult({
      score: null,
      grade: null,
      formula: null,
      formulaBreakdown: null,
      componentScores: null,
    })
    setError(null)
  }, [degree, level])

  // Update form fields when course changes
  useEffect(() => {
    if (selectedCourse) {
      const course = courseData.find((c) => c.id === selectedCourse)
      if (course) {
        setFormFields(course.formFields)
        // Initialize form values to null (empty)
        const initialValues: Record<string, number | null> = {}
        course.formFields.forEach((field) => {
          initialValues[field.id] = null
        })
        setFormValues(initialValues)
        setResult({
          score: null,
          grade: null,
          formula: course.formula,
          formulaBreakdown: null,
          componentScores: null,
        })
      }
    }
  }, [selectedCourse])

  const handleInputChange = (fieldId: string, value: string | number) => {
    // If the input is empty, set to null
    if (value === "") {
      setFormValues({
        ...formValues,
        [fieldId]: null,
      })
      return
    }

    const numValue = Number(value)

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



  const calculateGrade = () => {
    // Convert null values to 0 for calculation
    const calculationValues: Record<string, number> = {}
    for (const field of formFields) {
      calculationValues[field.id] = formValues[field.id] ?? 0
    }

    // Validate all inputs
    for (const field of formFields) {
      const value = calculationValues[field.id]
      if (value > field.max) {
        setError(`${field.label} cannot exceed ${field.max}`)
        return
      }
    }

    setError(null)

    const course = courseData.find((c) => c.id === selectedCourse)
    if (!course) return

    try {
      // Calculate score using the formula (bonus fields are already included)
      const finalScore = calculateScore(course.id, calculationValues)

      // Assign grade
      const grade = assignGrade(finalScore)

      // Generate formula breakdown
      const formulaBreakdown = generateFormulaBreakdown(course.id, calculationValues, finalScore)

      // Generate component scores for visual breakdown
      const componentScores = generateComponentScores(course, calculationValues, finalScore)

      setResult({
        score: finalScore,
        grade: grade,
        formula: course.formula,
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
    finalScore: number,
  ): string => {
    const course = courseData.find((c) => c.id === courseId)
    if (!course) return ""

    let breakdown = `Formula: ${course.formula}\n\n`
    breakdown += "Calculation:\n"

    // Add each component with its value
    for (const field of course.formFields) {
      breakdown += `${field.label} (${field.id}) = ${values[field.id]}\n`
    }

    breakdown += `\nFinal Score (T) = ${finalScore.toFixed(2)}\n`

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
    } else if (course.id === "mlp") {
      // MLP specific weights
      estimatedWeights["GAA"] = 0.1
      estimatedWeights["F"] = 0.3
      estimatedWeights["OPE1"] = 0.2
      estimatedWeights["OPE2"] = 0.2
      estimatedWeights["KA"] = 0.2
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
    const initialValues: Record<string, number | null> = {}
    formFields.forEach((field) => {
      initialValues[field.id] = null
    })
    setFormValues(initialValues)
    setResult({
      score: null,
      grade: null,
      formula: null,
      formulaBreakdown: null,
      componentScores: null,
    })
    setError(null)
  }

  // Get icon for field
  const getFieldIcon = (fieldId: string) => {
    if (fieldId.includes("GAA")) return <FileText className="h-4 w-4 text-amber-400" />
    if (fieldId.includes("Qz")) return <BookOpen className="h-4 w-4 text-violet-400" />
    if (fieldId === "F") return <Award className="h-4 w-4 text-blue-400" />
    if (fieldId.includes("PE") || fieldId.includes("OPPE") || fieldId.includes("OPE"))
      return <TrendingUp className="h-4 w-4 text-teal-400" />
    if (fieldId.includes("Bonus")) return <Sparkles className="h-4 w-4 text-green-400" />
    if (fieldId.includes("Project") || fieldId.includes("KA")) return <Lightbulb className="h-4 w-4 text-yellow-400" />
    if (fieldId.includes("Lab")) return <Flame className="h-4 w-4 text-orange-400" />
    return <Star className="h-4 w-4 text-pink-400" />
  }

  // Get grade color based on grade
  const getGradeColor = (grade: string | null): string => {
    if (!grade) return "from-gray-400 to-gray-500"

    switch (grade) {
      case "S":
        return "from-emerald-400 to-teal-500"
      case "A":
        return "from-blue-400 to-indigo-500"
      case "B":
        return "from-violet-400 to-purple-500"
      case "C":
        return "from-yellow-400 to-amber-500"
      case "D":
        return "from-orange-400 to-red-500"
      case "E":
        return "from-red-400 to-pink-500"
      case "F":
        return "from-red-500 to-rose-600"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  return (
    <Card className="w-full shadow-2xl bg-slate-900/70 border border-white/[0.08] rounded-3xl overflow-hidden backdrop-blur-2xl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl -z-10"></div>

      <CardContent className="p-8 sm:p-10 space-y-8 relative">
        {/* Course Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="relative group">
            <Label htmlFor="degree" className="text-white/70 mb-2.5 block flex items-center gap-2 text-sm font-semibold">
              <GraduationCap className="h-4 w-4 text-emerald-400" />
              Degree Program
            </Label>
            <Select value={degree} onValueChange={setDegree}>
              <SelectTrigger
                id="degree"
                className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white transition-all hover:border-emerald-400/60 hover:bg-white/[0.08] h-12 rounded-xl shadow-sm"
              >
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl">
                <SelectItem value="data-science" className="text-white focus:bg-emerald-600 focus:text-white rounded-lg">
                  Data Science
                </SelectItem>
                <SelectItem value="electronic-systems" className="text-white focus:bg-emerald-600 focus:text-white rounded-lg">
                  Electronic Systems
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative group">
            <Label htmlFor="level" className="text-white/70 mb-2.5 block flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4 text-blue-400" />
              Course Level
            </Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger
                id="level"
                className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white transition-all hover:border-blue-400/60 hover:bg-white/[0.08] h-12 rounded-xl shadow-sm"
              >
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl">
                <SelectItem value="foundation" className="text-white focus:bg-blue-600 focus:text-white rounded-lg">
                  Foundation
                </SelectItem>
                <SelectItem value="diploma" className="text-white focus:bg-blue-600 focus:text-white rounded-lg">
                  Diploma
                </SelectItem>
                <SelectItem value="degree" className="text-white focus:bg-blue-600 focus:text-white rounded-lg">
                  Degree
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative group sm:col-span-2 lg:col-span-1">
            <Label htmlFor="course" className="text-white/70 mb-2.5 block flex items-center gap-2 text-sm font-semibold">
              <FileText className="h-4 w-4 text-cyan-400" />
              Course Name
            </Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger
                id="course"
                className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white transition-all hover:border-cyan-400/60 hover:bg-white/[0.08] h-12 rounded-xl shadow-sm"
              >
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 max-h-[300px] rounded-xl shadow-2xl">
                {filteredCourses.map((course) => (
                  <SelectItem
                    key={course.id}
                    value={course.id}
                    className="text-white focus:bg-cyan-600 focus:text-white rounded-lg"
                  >
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Alert variant="destructive" className="bg-red-900/20 border-red-500/30 text-red-200 rounded-lg">
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
              {/* Course Info Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/[0.15] rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
                    <Calculator className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {courseData.find((c) => c.id === selectedCourse)?.name}
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Enter your scores below to calculate your final grade. All fields are optional - leave empty for 0.
                </p>
              </motion.div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    className="space-y-2 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white/[0.08] border border-white/[0.15] group-hover:border-white/25 transition-all duration-300 shadow-sm">
                        {getFieldIcon(field.id)}
                      </div>
                      <Label
                        htmlFor={field.id}
                        className="text-white/70 group-hover:text-white/90 transition-colors flex items-center gap-2 text-sm font-semibold"
                      >
                        {field.label}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-white/30 cursor-help group-hover:text-white/50 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-900 border-white/10 text-white rounded-lg">
                            <p>
                              {field.description} (Max: {field.max})
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-2">
                        <Input
                          id={field.id}
                          type="number"
                          min="0"
                          max={field.max}
                          placeholder={`0-${field.max}`}
                          value={formValues[field.id] === null ? "" : formValues[field.id]?.toString()}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all group-hover:border-white/20 hover:bg-white/[0.08] h-11 rounded-xl pr-8 w-28 shadow-sm font-medium"
                        />
                        <Slider
                          value={[formValues[field.id] || 0]}
                          max={field.max}
                          step={1}
                          onValueChange={(vals) => handleInputChange(field.id, vals[0])}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap justify-between gap-4 pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 transition-all rounded-lg h-10 px-4"
                >
                  <RefreshCw className="h-4 w-4" /> Reset Values
                </Button>
                <Button
                  onClick={calculateGrade}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-700/10 transition-all flex items-center gap-2 rounded-lg h-10 px-5"
                >
                  <Calculator className="h-4 w-4" /> Calculate Grade <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
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
              className="mt-8 space-y-8"
            >
              {/* Grade Display */}
              <motion.div
                className="relative overflow-hidden rounded-xl shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-amber-500/10 opacity-50"></div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-full blur-2xl"></div>

                {/* Grade content */}
                <div className="relative p-6 sm:p-8 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-2.5 rounded-xl shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-200">Your Final Grade</h3>
                  </div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`text-8xl sm:text-9xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${getGradeColor(result.grade)}`}
                      style={{ textShadow: "0 0 40px rgba(79, 70, 229, 0.4)" }}
                    >
                      {result.grade}
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium text-zinc-500 flex items-center justify-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-blue-400" />
                        Final Score
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <p className="text-3xl sm:text-4xl font-semibold text-zinc-200">
                          {result.score?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grade scale indicator */}
                  <div className="mt-8 w-full max-w-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-zinc-500">Fail</span>
                      <span className="text-xs text-zinc-500">Pass</span>
                      <span className="text-xs text-zinc-500">Excellent</span>
                    </div>
                    <Progress 
                      value={Math.min(((result.score || 0) / 100) * 100, 100)} 
                      className="h-3 bg-zinc-800" 
                      indicatorClassName="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    />
                    <div className="flex justify-between text-xs text-zinc-600 mt-1">
                      <span>0</span>
                      <span>40</span>
                      <span>60</span>
                      <span>80</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Visual Score Breakdown */}
              {result.componentScores && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <ScoreBreakdown componentScores={result.componentScores} totalScore={result.score || 0} />
                </motion.div>
              )}

              {/* Congratulatory message based on grade */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 text-center"
              >
                <div className="flex justify-center mb-2">
                  {result.grade === "S" || result.grade === "A" ? (
                    <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-2 rounded-full">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                  ) : result.grade === "F" ? (
                    <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-full">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>

                <p className="text-zinc-300 font-medium">
                  {result.grade === "S"
                    ? "Outstanding achievement! You've mastered this course with excellence."
                    : result.grade === "A"
                      ? "Excellent work! You've demonstrated a strong understanding of the course material."
                      : result.grade === "B"
                        ? "Great job! You've shown good comprehension of the course concepts."
                        : result.grade === "C"
                          ? "Good effort! You've demonstrated a satisfactory understanding of the material."
                          : result.grade === "D"
                            ? "You've passed the course. Consider reviewing some concepts for better understanding."
                            : result.grade === "E"
                              ? "You've just passed. Focus on strengthening your understanding of key concepts."
                              : "You'll need to retake this course. Don't be discouraged - use this as a learning opportunity."}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
