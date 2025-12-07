"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  RefreshCw,
  AlertTriangle,
  HelpCircle,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  Sparkles,
  GraduationCap,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { courseData } from "@/lib/course-data"
import { calculateScore } from "@/lib/calculate-score"
import { motion, AnimatePresence } from "framer-motion"
import type { FormField } from "@/lib/types"

export default function GradePredictor() {
  const [degree, setDegree] = useState<string>("data-science")
  const [level, setLevel] = useState<string>("foundation")
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [formValues, setFormValues] = useState<Record<string, number | null>>({})
  const [bonusMarks, setBonusMarks] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<{
    currentScore: number | null
    currentScoreNoBonus: number | null
    bonusApplied: number
    requiredScores: {
      grade: string
      minScore: number
      isPossible: boolean
      maxPossibleScore: number
    }[]
    message: string | null
  }>({
    currentScore: null,
    currentScoreNoBonus: null,
    bonusApplied: 0,
    requiredScores: [],
    message: null,
  })

  // Filter courses based on selected degree and level
  const filteredCourses = courseData.filter((course) => course.degree === degree && course.level === level)

  // Reset form when degree or level changes
  useEffect(() => {
    setSelectedCourse("")
    setFormFields([])
    setFormValues({})
    setBonusMarks(null)
    setPrediction({
      currentScore: null,
      currentScoreNoBonus: null,
      bonusApplied: 0,
      requiredScores: [],
      message: null,
    })
    setError(null)
  }, [degree, level])

  // Update form fields when course changes
  useEffect(() => {
    if (selectedCourse) {
      const course = courseData.find((c) => c.id === selectedCourse)
      if (course) {
        // Filter out the final exam field only
        const fieldsWithoutFinal = course.formFields.filter((field) => field.id !== "F")
        setFormFields(fieldsWithoutFinal)

        // Initialize form values to null (empty)
        const initialValues: Record<string, number | null> = {}
        fieldsWithoutFinal.forEach((field) => {
          initialValues[field.id] = null
        })
        setFormValues(initialValues)
        setBonusMarks(null)
        setPrediction({
          currentScore: null,
          currentScoreNoBonus: null,
          bonusApplied: 0,
          requiredScores: [],
          message: null,
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

  const handleBonusChange = (value: string) => {
    // If the input is empty, set to null
    if (value === "") {
      setBonusMarks(null)
      return
    }

    const numValue = Number(value)

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

  // Get minimum score needed for a grade
  const getMinScoreForGrade = (grade: string): number => {
    switch (grade) {
      case "S":
        return 90
      case "A":
        return 80
      case "B":
        return 70
      case "C":
        return 60
      case "D":
        return 50
      case "E":
        return 40
      default:
        return 0
    }
  }

  // Get color for grade
  const getGradeColor = (grade: string): string => {
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
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const calculateRequiredFinalScore = () => {
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
      // Get the final exam field
      const finalExamField = course.formFields.find((field) => field.id === "F")
      if (!finalExamField) {
        setError("This course doesn't have a final exam component")
        return
      }

      // Calculate current score without final exam
      const currentPartialScoreNoBonus = calculatePartialScore(course.id, calculationValues)

      // Use bonus marks from state and add to current score
      const bonus = bonusMarks ?? 0
      
      // Add bonus marks to current score (bonus only applies if base score >= 40)
      let currentPartialScore = currentPartialScoreNoBonus
      if (currentPartialScoreNoBonus >= 40 && bonus > 0) {
        currentPartialScore = Math.min(currentPartialScoreNoBonus + bonus, 100)
      }

      // Calculate required final exam scores for each grade
      const grades = ["S", "A", "B", "C", "D", "E"]
      const requiredScores = grades.map((grade) => {
        const targetScore = getMinScoreForGrade(grade)

        // Calculate what final exam score is needed to reach this grade
        // Now that bonus is already added to current score, we calculate based on the enhanced current score
        const requiredFinalScore = calculateRequiredFinalExamScore(
          course.id,
          calculationValues,
          targetScore,
          finalExamField.max,
          currentPartialScore,
          currentPartialScoreNoBonus,
        )

        // Check if it's possible to achieve this grade
        const isPossible = requiredFinalScore <= finalExamField.max

        return {
          grade,
          minScore: Math.max(0, Math.ceil(requiredFinalScore)),
          isPossible,
          maxPossibleScore: finalExamField.max,
        }
      })

      // Generate message
      const highestPossibleGrade = requiredScores.find((score) => score.isPossible)?.grade || "F"
      let message = ""

      // Calculate max possible score for display
      const maxScoreWithMaxFinal = calculateScore(course.id, { ...calculationValues, F: finalExamField.max })
      let maxPossibleTotal = maxScoreWithMaxFinal
      
      // Add bonus to max possible total if applicable
      if (maxScoreWithMaxFinal >= 40 && bonus > 0) {
        maxPossibleTotal = Math.min(maxScoreWithMaxFinal + bonus, 100)
      }

      if (highestPossibleGrade === "F") {
        message = `Based on your current scores, it's not possible to achieve a passing grade (E or above). Your maximum possible score is ${maxPossibleTotal.toFixed(2)}.`
      } else {
        message = `With your current scores${bonus > 0 && currentPartialScoreNoBonus >= 40 ? ` (including ${bonus} bonus marks)` : ''}, you can achieve up to a ${highestPossibleGrade} grade. Your maximum possible score is ${maxPossibleTotal.toFixed(2)}.`
      }

      setPrediction({
        currentScore: currentPartialScore,
        currentScoreNoBonus: currentPartialScoreNoBonus,
        bonusApplied: currentPartialScoreNoBonus >= 40 ? bonus : 0,
        requiredScores,
        message,
      })
    } catch (err) {
      setError("Error calculating prediction. Please check your inputs.")
    }
  }

  // Calculate score without final exam
  const calculatePartialScore = (courseId: string, values: Record<string, number>): number => {
    // Calculate the score assuming 0 for the final exam
    // This gives us the current standing based on other components
    return calculateScore(courseId, { ...values, F: 0 })
  }

  // Calculate required final exam score
  const calculateRequiredFinalExamScore = (
    courseId: string,
    values: Record<string, number>,
    targetScore: number,
    maxFinalScore: number,
    currentScoreWithBonus: number,
    currentScoreNoBonus: number,
  ): number => {
    // Since bonus is already added to current score, we just need to find
    // what final exam score will get us to the target
    
    // Use binary search to find minimum final exam score needed
    let low = 0
    let high = maxFinalScore
    let result = maxFinalScore + 1
    
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      
      // Calculate total score with this final exam score
      const scoreNoBonus = calculateScore(courseId, { ...values, F: mid })
      
      // Add bonus if applicable (base score >= 40)
      let totalScore = scoreNoBonus
      if (scoreNoBonus >= 40 && currentScoreWithBonus > currentScoreNoBonus) {
        // Bonus was applied to current score, so it should apply here too
        const bonusAmount = currentScoreWithBonus - currentScoreNoBonus
        totalScore = Math.min(scoreNoBonus + bonusAmount, 100)
      }
      
      if (totalScore >= targetScore) {
        result = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
    
    return result
  }

  const resetPredictor = () => {
    // Reset form values but keep the selected course
    const initialValues: Record<string, number | null> = {}
    formFields.forEach((field) => {
      initialValues[field.id] = null
    })
    setFormValues(initialValues)
    setBonusMarks(null)
    setPrediction({
      currentScore: null,
      currentScoreNoBonus: null,
      bonusApplied: 0,
      requiredScores: [],
      message: null,
    })
    setError(null)
  }

  // Get icon for field
  const getFieldIcon = (fieldId: string) => {
    if (fieldId.includes("GAA")) return <FileText className="h-4 w-4 text-amber-400" />
    if (fieldId.includes("Qz")) return <BookOpen className="h-4 w-4 text-violet-400" />
    if (fieldId === "F") return <Award className="h-4 w-4 text-blue-400" />
    if (fieldId.includes("PE") || fieldId.includes("OPPE")) return <TrendingUp className="h-4 w-4 text-teal-400" />
    if (fieldId.includes("Bonus")) return <Sparkles className="h-4 w-4 text-green-400" />
    return <FileText className="h-4 w-4 text-pink-400" />
  }

  return (
    <Card className="w-full shadow-2xl bg-slate-900/70 border border-white/[0.08] rounded-3xl overflow-hidden backdrop-blur-2xl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-rose-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-500/10 to-cyan-500/5 rounded-full blur-3xl -z-10"></div>

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
              <GraduationCap className="h-4 w-4 text-amber-400" />
              Degree Program
            </Label>
            <Select value={degree} onValueChange={setDegree}>
              <SelectTrigger
                id="degree"
                className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white transition-all hover:border-amber-400/60 hover:bg-white/[0.08] h-12 rounded-xl shadow-sm"
              >
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl">
                <SelectItem value="data-science" className="text-white focus:bg-amber-600 focus:text-white rounded-lg">
                  Data Science
                </SelectItem>
                <SelectItem value="electronic-systems" className="text-white focus:bg-amber-600 focus:text-white rounded-lg">
                  Electronic Systems
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative group">
            <Label htmlFor="level" className="text-white/70 mb-2.5 block flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4 text-rose-400" />
              Course Level
            </Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger
                id="level"
                className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white transition-all hover:border-rose-400/60 hover:bg-white/[0.08] h-12 rounded-xl shadow-sm"
              >
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl">
                <SelectItem value="foundation" className="text-white focus:bg-rose-600 focus:text-white rounded-lg">
                  Foundation
                </SelectItem>
                <SelectItem value="diploma" className="text-white focus:bg-rose-600 focus:text-white rounded-lg">
                  Diploma
                </SelectItem>
                <SelectItem value="degree" className="text-white focus:bg-rose-600 focus:text-white rounded-lg">
                  Degree
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative group">
            <Label htmlFor="course" className="text-white/70 mb-2.5 block flex items-center gap-2 text-sm font-semibold">
              <FileText className="h-4 w-4 text-teal-400" />
              Course Name
            </Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger
                id="course"
                className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white transition-all hover:border-teal-400/60 hover:bg-white/[0.08] h-12 rounded-xl shadow-sm"
              >
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 max-h-[300px] rounded-xl shadow-2xl">
                {filteredCourses.map((course) => (
                  <SelectItem
                    key={course.id}
                    value={course.id}
                    className="text-white focus:bg-teal-600 focus:text-white rounded-lg"
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
              <Alert variant="destructive" className="bg-red-900/20 border-red-500/30 text-red-200 rounded-xl">
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
              className="space-y-8"
            >
              {/* Course Info Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/[0.15] rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 p-2.5 rounded-xl shadow-lg shadow-amber-500/20">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Grade Predictor for {courseData.find((c) => c.id === selectedCourse)?.name}
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Enter your current scores for all components except the final exam. We'll calculate the minimum final
                  exam score you need to achieve each grade.
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
                          <TooltipContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-white rounded-xl shadow-2xl">
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
                          className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white placeholder:text-white/40 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all group-hover:border-white/20 hover:bg-white/[0.08] h-11 rounded-xl pr-8 w-28 shadow-sm font-medium"
                        />
                        <Slider
                          value={[formValues[field.id] || 0]}
                          max={field.max}
                          step={1}
                          onValueChange={(vals) => handleInputChange(field.id, vals[0])}
                          className="flex-1"
                        />
                      </div>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs hidden">
                        /{field.max}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Bonus Marks */}
                <motion.div
                  className="space-y-2 group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: formFields.length * 0.05 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white/[0.08] border border-white/[0.15] group-hover:border-emerald-500/40 transition-all duration-300 shadow-sm">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                    </div>
                    <Label
                      htmlFor="bonus"
                      className="text-white/70 group-hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm font-semibold"
                    >
                      Bonus Marks
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3.5 w-3.5 text-white/30 cursor-help group-hover:text-emerald-400/70 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-white rounded-xl shadow-2xl">
                          <p>Bonus marks (out of 5) are applied only if your total score is ≥ 40</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative">
                    <Input
                      id="bonus"
                      type="number"
                      min="0"
                      max="5"
                      placeholder="0-5"
                      value={bonusMarks === null ? "" : bonusMarks.toString()}
                      onChange={(e) => handleBonusChange(e.target.value)}
                      className="bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all group-hover:border-emerald-500/30 hover:bg-white/[0.08] h-11 rounded-xl pr-10 shadow-sm font-medium"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-xs font-medium">/5</div>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap justify-between gap-4 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  onClick={resetPredictor}
                  className="flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border-white/[0.12] text-white hover:bg-white/[0.08] hover:border-white/20 transition-all rounded-xl h-11 px-6 shadow-sm font-semibold"
                >
                  <RefreshCw className="h-4 w-4" /> Reset Values
                </Button>
                <Button
                  onClick={calculateRequiredFinalScore}
                  className="bg-gradient-to-r from-amber-600 via-amber-500 to-rose-600 hover:from-amber-700 hover:via-amber-600 hover:to-rose-700 text-white shadow-xl shadow-amber-600/20 hover:shadow-amber-600/30 transition-all flex items-center gap-2 rounded-xl h-11 px-8 font-bold"
                >
                  <Target className="h-4 w-4" /> Predict Required Scores
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {prediction.requiredScores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-8 space-y-8"
            >
              {/* Prediction Display */}
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                style={{
                  background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))",
                  backdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-500/15 to-rose-500/15 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-teal-500/15 to-emerald-500/15 rounded-full blur-3xl"></div>

                {/* Prediction content */}
                <div className="relative p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 p-3 rounded-xl shadow-xl shadow-amber-500/20">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Required Final Exam Scores</h3>
                  </div>

                  <div className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.12] rounded-xl p-6 mb-8 space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 font-medium">Current Score (Before Final):</span>
                        <span className="text-white font-bold text-lg">{prediction.currentScoreNoBonus?.toFixed(2)}</span>
                      </div>
                      {prediction.bonusApplied > 0 && (
                        <>
                          <div className="flex justify-between items-center text-emerald-400">
                            <span className="font-medium flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              Bonus Marks Added:
                            </span>
                            <span className="font-bold text-lg">+{prediction.bonusApplied}</span>
                          </div>
                          <div className="flex justify-between items-center border-t border-white/10 pt-2">
                            <span className="text-white font-semibold">Total Current Score:</span>
                            <span className="text-emerald-400 font-bold text-xl">{prediction.currentScore?.toFixed(2)}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-3">
                      <p className="text-white/80 leading-relaxed">{prediction.message}</p>
                    </div>
                    {prediction.bonusApplied > 0 && (
                      <p className="text-emerald-400 text-sm flex items-center gap-2 bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                        <Sparkles className="h-4 w-4" />
                        Bonus marks are already included in the calculations above. Required final scores shown below account for your bonus.
                      </p>
                    )}
                  </div>

                  {/* Table of required scores */}
                  <div className="overflow-hidden rounded-xl border border-white/[0.12] mb-6 backdrop-blur-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-white/[0.08]">
                        <tr>
                          <th className="px-5 py-4 text-left text-white/80 font-bold">Grade</th>
                          <th className="px-5 py-4 text-left text-white/80 font-bold">Min. Score</th>
                          <th className="px-5 py-4 text-left text-white/80 font-bold">Required Final Score</th>
                          <th className="px-5 py-4 text-left text-white/80 font-bold">Achievable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.08]">
                        {prediction.requiredScores.map((score) => (
                          <tr key={score.grade} className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${getGradeColor(score.grade)}`}
                                >
                                  {score.grade}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-white/60 font-medium">{getMinScoreForGrade(score.grade)}+</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <span
                                  className={`font-bold text-lg ${score.isPossible ? "text-white" : "text-white/30"}`}
                                >
                                  {score.minScore}
                                </span>
                                <div className="w-20 h-2.5 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${score.isPossible ? "bg-gradient-to-r from-amber-500 to-rose-600 shadow-sm" : "bg-white/20"}`}
                                    style={{
                                      width: `${Math.min((score.minScore / score.maxPossibleScore) * 100, 100)}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              {score.isPossible ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Yes
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
                                  <XCircle className="h-3.5 w-3.5" /> No
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-xs text-white/40 mt-6 space-y-1.5 bg-white/[0.03] rounded-lg p-4 border border-white/[0.08]">
                    <p className="font-medium">
                      Note: These calculations are approximations based on the course formula. The actual required
                      scores may vary slightly.
                    </p>
                    <p>Final exam maximum score: 100 points</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
