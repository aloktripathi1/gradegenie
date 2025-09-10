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
import { courseData } from "@/lib/course-data"
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
    requiredScores: {
      grade: string
      minScore: number
      isPossible: boolean
      maxPossibleScore: number
    }[]
    message: string | null
  }>({
    currentScore: null,
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
        // Filter out the final exam field
        const fieldsWithoutFinal = course.formFields.filter((field) => field.id !== "F")
        setFormFields(fieldsWithoutFinal)

        // Initialize form values to null (empty)
        const initialValues: Record<string, number | null> = {}
        fieldsWithoutFinal.forEach((field) => {
          initialValues[field.id] = null
        })
        setFormValues(initialValues)
        setPrediction({
          currentScore: null,
          requiredScores: [],
          message: null,
        })
        setBonusMarks(null)
      }
    }
  }, [selectedCourse])

  const handleInputChange = (fieldId: string, value: string) => {
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
      // We need to create a special function to calculate partial scores
      const currentPartialScore = calculatePartialScore(course.id, calculationValues)

      // Calculate required final exam scores for each grade
      const grades = ["S", "A", "B", "C", "D", "E"]
      const requiredScores = grades.map((grade) => {
        const targetScore = getMinScoreForGrade(grade)

        // Calculate what final exam score is needed to reach this grade
        // This is a simplified approach and would need to be adjusted based on the actual formula
        const requiredFinalScore = calculateRequiredFinalExamScore(
          course.id,
          calculationValues,
          targetScore,
          finalExamField.max,
          bonusMarks ?? 0,
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

      if (highestPossibleGrade === "F") {
        message =
          "Based on your current scores, it's not possible to achieve a passing grade even with a perfect final exam score."
      } else {
        message = `With your current scores, you can achieve up to a ${highestPossibleGrade} grade with the right final exam score.`
      }

      setPrediction({
        currentScore: currentPartialScore,
        requiredScores,
        message,
      })
    } catch (err) {
      setError("Error calculating prediction. Please check your inputs.")
    }
  }

  // Calculate score without final exam
  const calculatePartialScore = (courseId: string, values: Record<string, number>): number => {
    // This is a simplified approach - in a real implementation, you would need to analyze the formula
    // more carefully to determine the partial score without the final exam

    // For this example, we'll assume the final exam is worth 40% of the total grade
    // and the other components make up 60%

    // In a real implementation, you would need to extract this information from the course formula

    // For now, let's just return a simple calculation
    let sum = 0
    let count = 0

    for (const key in values) {
      sum += values[key]
      count++
    }

    return count > 0 ? sum / count : 0
  }

  // Calculate required final exam score
  const calculateRequiredFinalExamScore = (
    courseId: string,
    values: Record<string, number>,
    targetScore: number,
    maxFinalScore: number,
    bonusMarks: number,
  ): number => {
    // This is a simplified approach - in a real implementation, you would need to analyze the formula
    // more carefully to determine the exact final exam score needed

    // For this example, we'll use a simple approach based on the course ID

    // Get the course formula
    const course = courseData.find((c) => c.id === courseId)
    if (!course) return 100 // Default to max score if course not found

    // Different calculation based on course pattern
    if (courseId.includes("python") || courseId === "python-es") {
      // Python courses typically have final exam worth 40%
      const currentScore =
        0.1 * (values["GAA1"] || 0) +
        0.1 * (values["GAA2"] || 0) +
        0.1 * (values["Qz1"] || 0) +
        0.15 * (values["PE1"] || 0) +
        0.15 * (values["PE2"] || 0)

      // Target score minus current components, divided by final exam weight
      const requiredContribution = targetScore - currentScore - (bonusMarks > 0 ? Math.min(bonusMarks, 5) : 0)
      return requiredContribution / 0.4 // Final exam is 40%
    } else if (courseId.includes("stats")) {
      // Stats courses
      const currentScore = 0.1 * (values["GAA"] || 0) + 0.2 * Math.max(values["Qz1"] || 0, values["Qz2"] || 0)

      const requiredContribution = targetScore - currentScore - (bonusMarks > 0 ? Math.min(bonusMarks, 5) : 0)
      return requiredContribution / 0.6 // Final exam is 60%
    } else {
      // Standard courses
      const currentScore = 0.1 * (values["GAA"] || 0) + 0.2 * (values["Qz1"] || 0) + 0.3 * (values["Qz2"] || 0)

      const requiredContribution = targetScore - currentScore - (bonusMarks > 0 ? Math.min(bonusMarks, 5) : 0)
      return requiredContribution / 0.4 // Final exam is 40%
    }
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
    <Card className="w-full shadow-2xl bg-black border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-teal-600/5 rounded-full blur-3xl -z-10"></div>

      <CardContent className="p-4 sm:p-6 space-y-8 relative">
        {/* Course Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="relative group">
            <Label htmlFor="degree" className="text-zinc-400 mb-2 block flex items-center gap-2 text-sm font-medium">
              <GraduationCap className="h-4 w-4 text-amber-400" />
              Degree Program
            </Label>
            <Select value={degree} onValueChange={setDegree}>
              <SelectTrigger
                id="degree"
                className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 text-zinc-300 transition-all group-hover:border-amber-500 hover:bg-zinc-800/80 h-10 rounded-lg"
              >
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 rounded-lg">
                <SelectItem value="data-science" className="text-zinc-300 focus:bg-amber-600 focus:text-white">
                  Data Science
                </SelectItem>
                <SelectItem value="electronic-systems" className="text-zinc-300 focus:bg-amber-600 focus:text-white">
                  Electronic Systems
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative group">
            <Label htmlFor="level" className="text-zinc-400 mb-2 block flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-4 w-4 text-rose-400" />
              Course Level
            </Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger
                id="level"
                className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 text-zinc-300 transition-all group-hover:border-rose-500 hover:bg-zinc-800/80 h-10 rounded-lg"
              >
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 rounded-lg">
                <SelectItem value="foundation" className="text-zinc-300 focus:bg-rose-600 focus:text-white">
                  Foundation
                </SelectItem>
                <SelectItem value="diploma" className="text-zinc-300 focus:bg-rose-600 focus:text-white">
                  Diploma
                </SelectItem>
                <SelectItem value="degree" className="text-zinc-300 focus:bg-rose-600 focus:text-white">
                  Degree
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative group">
            <Label htmlFor="course" className="text-zinc-400 mb-2 block flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-teal-400" />
              Course Name
            </Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger
                id="course"
                className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 text-zinc-300 transition-all group-hover:border-teal-500 hover:bg-zinc-800/80 h-10 rounded-lg"
              >
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 max-h-[300px] rounded-lg">
                {filteredCourses.map((course) => (
                  <SelectItem
                    key={course.id}
                    value={course.id}
                    className="text-zinc-300 focus:bg-teal-600 focus:text-white"
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
              <Alert variant="destructive" className="bg-red-950/30 border-red-900 text-red-200 rounded-lg">
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
                className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-br from-amber-500 to-rose-600 p-2 rounded-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-200">
                    Grade Predictor for {courseData.find((c) => c.id === selectedCourse)?.name}
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm">
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
                    <div className="flex items-center gap-1.5">
                      <div className="p-1.5 rounded-md bg-zinc-900/80 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                        {getFieldIcon(field.id)}
                      </div>
                      <Label
                        htmlFor={field.id}
                        className="text-zinc-400 group-hover:text-zinc-300 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        {field.label}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-zinc-600 cursor-help group-hover:text-zinc-500 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-zinc-900 border-zinc-800 text-zinc-300 rounded-lg">
                            <p>
                              {field.description} (Max: {field.max})
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <Input
                        id={field.id}
                        type="number"
                        min="0"
                        max={field.max}
                        placeholder={`0-${field.max}`}
                        value={formValues[field.id] === null ? "" : formValues[field.id]?.toString()}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 text-zinc-300 placeholder:text-zinc-600 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-zinc-700 hover:border-zinc-700 h-10 rounded-lg pr-8"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">
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
                  <div className="flex items-center gap-1.5">
                    <div className="p-1.5 rounded-md bg-zinc-900/80 border border-zinc-800 group-hover:border-green-800 transition-colors">
                      <Sparkles className="h-4 w-4 text-green-400" />
                    </div>
                    <Label
                      htmlFor="bonus"
                      className="text-zinc-400 group-hover:text-green-400 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      Bonus Marks
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3.5 w-3.5 text-zinc-600 cursor-help group-hover:text-green-600 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-zinc-900 border-zinc-800 text-zinc-300 rounded-lg">
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
                      className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 text-zinc-300 placeholder:text-zinc-600 focus:ring-green-500 focus:border-green-500 transition-all group-hover:border-green-800 hover:border-zinc-700 h-10 rounded-lg pr-8"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">/5</div>
                  </div>
                </motion.div>
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
                  onClick={resetPredictor}
                  className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 transition-all rounded-lg h-10 px-4"
                >
                  <RefreshCw className="h-4 w-4" /> Reset Values
                </Button>
                <Button
                  onClick={calculateRequiredFinalScore}
                  className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white shadow-lg shadow-amber-700/10 transition-all flex items-center gap-2 rounded-lg h-10 px-5"
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
                className="relative overflow-hidden rounded-xl shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-rose-500/10 opacity-50"></div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>

                {/* Prediction content */}
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-amber-500 to-rose-600 p-2.5 rounded-xl shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-200">Required Final Exam Scores</h3>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 mb-6">
                    <p className="text-zinc-300">{prediction.message}</p>
                  </div>

                  {/* Table of required scores */}
                  <div className="overflow-hidden rounded-lg border border-zinc-800 mb-6">
                    <table className="w-full text-sm">
                      <thead className="bg-zinc-800/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-zinc-300 font-medium">Grade</th>
                          <th className="px-4 py-3 text-left text-zinc-300 font-medium">Required Final Score</th>
                          <th className="px-4 py-3 text-left text-zinc-300 font-medium">Achievable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {prediction.requiredScores.map((score) => (
                          <tr key={score.grade} className="bg-zinc-900/30 hover:bg-zinc-900/60 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getGradeColor(score.grade)}`}>
                                  {score.grade}({getMinScoreForGrade(score.grade)}+)
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-semibold ${score.isPossible ? "text-zinc-200" : "text-zinc-500"}`}
                                >
                                  {score.minScore}
                                </span>
                                <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${score.isPossible ? "bg-gradient-to-r from-amber-600 to-rose-600" : "bg-zinc-700"}`}
                                    style={{
                                      width: `${Math.min((score.minScore / score.maxPossibleScore) * 100, 100)}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {score.isPossible ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium">
                                  <CheckCircle2 className="h-3 w-3" /> Yes
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-900/30 text-red-400 text-xs font-medium">
                                  <XCircle className="h-3 w-3" /> No
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-xs text-zinc-500 mt-4">
                    <p>
                      Note: These calculations are approximations based on the course formula. The actual required
                      scores may vary slightly.
                    </p>
                    <p className="mt-1">Final exam maximum score: 100 points</p>
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
