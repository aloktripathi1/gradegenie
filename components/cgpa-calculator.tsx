"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, RefreshCw, AlertTriangle, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Course {
  id: number
  grade: string
  credits: number
}

const GRADE_POINTS: Record<string, number> = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 4,
}

const AVAILABLE_GRADES = ["S", "A", "B", "C", "D", "E"]
const AVAILABLE_CREDITS = [2, 3, 4]

export default function CGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, grade: "", credits: 0 },
  ])
  const [cgpa, setCgpa] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const addCourse = () => {
    const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1
    setCourses([...courses, { id: newId, grade: "", credits: 0 }])
    setError(null)
  }

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id))
      setError(null)
      // Clear result when removing a course
      setCgpa(null)
    } else {
      setError("At least one course is required")
    }
  }

  const updateCourse = (id: number, field: "grade" | "credits", value: string | number) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    )
    setError(null)
    // Clear result when updating a course
    setCgpa(null)
  }

  const calculateCGPA = () => {
    // Validate that all courses have both grade and credits selected
    const incompleteCourses = courses.filter((course) => !course.grade || course.credits === 0)
    if (incompleteCourses.length > 0) {
      setError("Please select both grade and credits for all courses")
      return
    }

    try {
      // Calculate total grade points and total credits
      let totalGradePoints = 0
      let totalCredits = 0

      courses.forEach((course) => {
        const gradePoint = GRADE_POINTS[course.grade]
        totalGradePoints += gradePoint * course.credits
        totalCredits += course.credits
      })

      // Calculate CGPA
      if (totalCredits === 0) {
        setError("No valid courses to calculate CGPA")
        return
      }

      const calculatedCGPA = totalGradePoints / totalCredits
      setCgpa(Number(calculatedCGPA.toFixed(2)))
      setError(null)
    } catch (err) {
      setError("Error calculating CGPA. Please check your inputs.")
    }
  }

  const resetCalculator = () => {
    setCourses([{ id: 1, grade: "", credits: 0 }])
    setCgpa(null)
    setError(null)
  }

  return (
    <Card className="w-full shadow-lg bg-gray-800 border-gray-700">
      <CardContent className="p-6 space-y-6">
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

        {/* Course List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-300 text-lg font-semibold">Courses</Label>
            <Button
              onClick={addCourse}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <Plus className="h-4 w-4" /> Add Course
            </Button>
          </div>

          <AnimatePresence>
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 p-4 rounded-lg bg-gray-700/50 border border-gray-600"
              >
                <div className="space-y-2">
                  <Label htmlFor={`grade-${course.id}`} className="text-gray-300">
                    Grade
                  </Label>
                  <Select
                    value={course.grade}
                    onValueChange={(value) => updateCourse(course.id, "grade", value)}
                  >
                    <SelectTrigger
                      id={`grade-${course.id}`}
                      className="bg-gray-700 border-gray-600 text-gray-200"
                    >
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {AVAILABLE_GRADES.map((grade) => (
                        <SelectItem
                          key={grade}
                          value={grade}
                          className="text-gray-200 focus:bg-gray-600 focus:text-white"
                        >
                          {grade} ({GRADE_POINTS[grade]} points)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`credits-${course.id}`} className="text-gray-300">
                    Credits
                  </Label>
                  <Select
                    value={course.credits.toString()}
                    onValueChange={(value) => updateCourse(course.id, "credits", Number(value))}
                  >
                    <SelectTrigger
                      id={`credits-${course.id}`}
                      className="bg-gray-700 border-gray-600 text-gray-200"
                    >
                      <SelectValue placeholder="Select Credits" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {AVAILABLE_CREDITS.map((credit) => (
                        <SelectItem
                          key={credit}
                          value={credit.toString()}
                          className="text-gray-200 focus:bg-gray-600 focus:text-white"
                        >
                          {credit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={() => removeCourse(course.id)}
                    variant="outline"
                    size="icon"
                    disabled={courses.length === 1}
                    className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-red-900/30 hover:border-red-800 hover:text-red-200 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={resetCalculator}
            className="flex items-center gap-1 bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
          >
            <RefreshCw className="h-4 w-4" /> Reset
          </Button>
          <Button onClick={calculateCGPA} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Calculator className="mr-2 h-4 w-4" /> Calculate CGPA
          </Button>
        </div>

        {/* CGPA Result */}
        <AnimatePresence>
          {cgpa !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6"
            >
              <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 shadow-lg">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Your CGPA</h3>
                <div className="text-6xl font-bold mb-4" style={{ color: getCGPAColor(cgpa) }}>
                  {cgpa.toFixed(2)}
                </div>
                <div className="w-full max-w-xs">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Total Credits</span>
                    <span className="font-semibold text-gray-200">
                      {courses.reduce((sum, course) => sum + course.credits, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Total Courses</span>
                    <span className="font-semibold text-gray-200">{courses.length}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-4 p-4 rounded-lg bg-gray-700/50 border border-gray-600"
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">Course Breakdown</h4>
                <div className="space-y-2">
                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="flex justify-between items-center text-sm text-gray-400 py-2 border-b border-gray-600 last:border-0"
                    >
                      <span className="text-gray-300">
                        Course {index + 1}: Grade {course.grade}
                      </span>
                      <span className="text-gray-200">
                        {GRADE_POINTS[course.grade]} × {course.credits} = {GRADE_POINTS[course.grade] * course.credits}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-200 pt-2">
                    <span>Total Grade Points</span>
                    <span>
                      {courses.reduce(
                        (sum, course) => sum + GRADE_POINTS[course.grade] * course.credits,
                        0
                      )}
                    </span>
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

function getCGPAColor(cgpa: number): string {
  if (cgpa >= 9.0) return "#10B981" // emerald-500 (S)
  if (cgpa >= 8.0) return "#34D399" // emerald-400 (A)
  if (cgpa >= 7.0) return "#3B82F6" // blue-500 (B)
  if (cgpa >= 6.0) return "#60A5FA" // blue-400 (C)
  if (cgpa >= 5.0) return "#F59E0B" // amber-500 (D)
  return "#FBBF24" // amber-400 (E)
}
