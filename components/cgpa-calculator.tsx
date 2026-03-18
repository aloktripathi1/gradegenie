"use client"

import { useMemo, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, RefreshCw, AlertTriangle, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const GRADE_POINTS = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 4,
} as const

type Grade = keyof typeof GRADE_POINTS

interface ParsedCourse {
  id: number
  code: string
  name: string
  credits: number
  grade: Grade
}

interface ManualCourseDraft {
  count: "1" | "2" | "3"
  credits: "" | "2" | "3" | "4"
  grade: "" | Grade
}

const COURSE_REGEX = /\b(SEP|JAN|MAY)\s+\d{4}\s+([A-Z]{2}\d{4}P?)\s+(.+?)\s+([234])\s+[A-Z]{2}\s+([SABCDE])\b/g

export default function CGPACalculator() {
  const previewSectionRef = useRef<HTMLDivElement | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [inputText, setInputText] = useState("")
  const [parsedCourses, setParsedCourses] = useState<ParsedCourse[]>([])
  const [manualCourses, setManualCourses] = useState<ParsedCourse[]>([])
  const [manualDraft, setManualDraft] = useState<ManualCourseDraft>({
    count: "1",
    credits: "",
    grade: "",
  })
  const [cgpa, setCgpa] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const allCourses = useMemo(() => {
    return [...parsedCourses, ...manualCourses]
  }, [parsedCourses, manualCourses])

  const parseCourses = () => {
    const sourceText = inputText.trim()

    let textCourses: ParsedCourse[] = []
    if (sourceText) {
      const matches = [...sourceText.matchAll(COURSE_REGEX)]
      textCourses = matches.map((match, index) => ({
        id: index + 1,
        code: match[2],
        name: match[3].replace(/\s+/g, " ").trim(),
        credits: Number(match[4]),
        grade: match[5] as Grade,
      }))
    }

    if (textCourses.length === 0 && manualCourses.length === 0) {
      setError("No valid courses found. Paste grade card text or add manual courses.")
      return
    }

    setParsedCourses(textCourses)
    setStep(2)
    setCgpa(null)
    setError(null)

    // Bring users directly to preview + calculate actions after parsing.
    setTimeout(() => {
      previewSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 0)
  }

  const addManualCourse = () => {
    if (!manualDraft.credits || !manualDraft.grade) {
      setError("Select credits and grade to add a course.")
      return
    }

    const nextId =
      Math.max(0, ...parsedCourses.map((c) => c.id), ...manualCourses.map((c) => c.id)) + 1
    const selectedGrade = manualDraft.grade as Grade
    const selectedCredits = Number(manualDraft.credits)

    const numberToAdd = Number(manualDraft.count)
    const newManualCourses: ParsedCourse[] = Array.from({ length: numberToAdd }, (_, index) => {
      const id = nextId + index
      const manualCourseNumber = manualCourses.length + index + 1
      return {
        id,
        code: `MAN${manualCourseNumber}`,
        name: `Course ${manualCourseNumber}`,
        credits: selectedCredits,
        grade: selectedGrade,
      }
    })

    setManualCourses((prev) => [...prev, ...newManualCourses])
    setManualDraft((prev) => ({ ...prev, credits: "", grade: "" }))
    setError(null)
    setCgpa(null)
  }

  const removeCourse = (id: number) => {
    setParsedCourses((prev) => prev.filter((course) => course.id !== id))
    setManualCourses((prev) => prev.filter((course) => course.id !== id))
    setCgpa(null)
    setError(null)
  }

  const calculateCGPA = () => {
    if (allCourses.length === 0) {
      setError("No courses available. Parse text or add manual courses first.")
      return
    }

    const totalGradePoints = allCourses.reduce(
      (sum, course) => sum + GRADE_POINTS[course.grade] * course.credits,
      0
    )
    const totalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0)

    if (totalCredits === 0) {
      setError("No valid courses to calculate CGPA")
      return
    }

    const calculatedCGPA = totalGradePoints / totalCredits
    setCgpa(Number(calculatedCGPA.toFixed(2)))
    setStep(3)
    setError(null)

    // Show the full CGPA view (page heading + step strip + result card).
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 0)
  }

  const resetCalculator = () => {
    setStep(1)
    setInputText("")
    setParsedCourses([])
    setManualCourses([])
    setManualDraft({ count: "1", credits: "", grade: "" })
    setCgpa(null)
    setError(null)
  }

  const totalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0)
  const totalGradePoints = allCourses.reduce(
    (sum, course) => sum + GRADE_POINTS[course.grade] * course.credits,
    0
  )

  return (
    <Card className="w-full shadow-2xl bg-slate-900/70 border border-white/[0.08] rounded-3xl overflow-hidden backdrop-blur-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-500/10 to-cyan-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 to-teal-500/5 rounded-full blur-3xl -z-10"></div>

      <CardContent className="p-8 sm:p-10 space-y-8 relative">
        <div className="flex items-center justify-between text-sm">
          <span className={`font-semibold ${step === 1 ? "text-teal-400" : "text-gray-400"}`}>
            Step 1: Input
          </span>
          <span className={`font-semibold ${step === 2 ? "text-teal-400" : "text-gray-400"}`}>
            Step 2: Parse & Preview
          </span>
          <span className={`font-semibold ${step === 3 ? "text-teal-400" : "text-gray-400"}`}>
            Step 3: Result
          </span>
        </div>

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

        {step === 1 && (
          <motion.div initial={false} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rounded-lg border border-gray-600 bg-gray-700/40 p-4">
              <p className="text-sm text-gray-200 font-semibold">Fastest way: paste your grade card text and continue.</p>
              <details className="mt-2 text-xs text-gray-400">
                <summary className="cursor-pointer hover:text-gray-300">How to copy text from portal</summary>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Go to Documents in your student portal.</li>
                  <li>Download and open the latest grade card.</li>
                  <li>Select all text, copy, and paste below.</li>
                </ol>
              </details>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade-card-text" className="text-gray-300 text-base font-semibold">
                Paste Grade Card Text
              </Label>
              <textarea
                id="grade-card-text"
                value={inputText}
                onChange={(event) => {
                  setInputText(event.target.value)
                  setError(null)
                }}
                rows={10}
                placeholder="Paste raw grade card text here..."
                className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-3 rounded-lg border border-gray-600 bg-gray-700/40 p-4">
              <Label className="text-gray-300 text-base font-semibold">
                Quick Add Course
              </Label>
              <p className="text-xs text-gray-400">
                Skip typing names. We auto-create <span className="text-gray-200">Course {manualCourses.length + 1}</span>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select
                  value={manualDraft.count}
                  onValueChange={(value: "1" | "2" | "3") => {
                    setManualDraft((prev) => ({ ...prev, count: value }))
                    setError(null)
                  }}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200 h-10">
                    <SelectValue placeholder="How many courses" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="1" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                      1 Course
                    </SelectItem>
                    <SelectItem value="2" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                      2 Courses
                    </SelectItem>
                    <SelectItem value="3" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                      3 Courses
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={manualDraft.credits}
                  onValueChange={(value: "2" | "3" | "4") => {
                    setManualDraft((prev) => ({ ...prev, credits: value }))
                    setError(null)
                  }}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200 h-10">
                    <SelectValue placeholder="Credits" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="2" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                      2
                    </SelectItem>
                    <SelectItem value="3" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                      3
                    </SelectItem>
                    <SelectItem value="4" className="text-gray-200 focus:bg-gray-600 focus:text-white">
                      4
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={manualDraft.grade}
                  onValueChange={(value: Grade) => {
                    setManualDraft((prev) => ({ ...prev, grade: value }))
                    setError(null)
                  }}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200 h-10">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {(Object.keys(GRADE_POINTS) as Grade[]).map((grade) => (
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

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Manually added: <span className="text-gray-200 font-semibold">{manualCourses.length}</span>
                </p>
                <Button
                  variant="outline"
                  onClick={addManualCourse}
                  className="flex items-center gap-1 bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                >
                  <Plus className="h-4 w-4" /> Add {manualDraft.count} Course{manualDraft.count === "1" ? "" : "s"}
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={resetCalculator}
                className="flex items-center gap-1 bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
              >
                <RefreshCw className="h-4 w-4" /> Reset
              </Button>
              <Button onClick={parseCourses} className="bg-teal-600 hover:bg-teal-700 text-white">
                Parse Courses -&gt;
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div ref={previewSectionRef} initial={false} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-between rounded-lg border border-gray-600 bg-gray-700/40 p-3">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1)
                  setError(null)
                }}
                className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
              >
                Back to Input
              </Button>
              <Button
                onClick={calculateCGPA}
                className="bg-teal-600 hover:bg-teal-700 text-white"
                disabled={allCourses.length === 0}
              >
                <Calculator className="mr-2 h-4 w-4" /> Calculate CGPA
              </Button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-600 bg-gray-700/40">
              <table className="w-full text-left text-sm text-gray-200">
                <thead className="bg-gray-700/70 text-gray-300">
                  <tr>
                    <th className="px-3 py-2">Code</th>
                    <th className="px-3 py-2">Course Name</th>
                    <th className="px-3 py-2">Credits</th>
                    <th className="px-3 py-2">Grade</th>
                    <th className="px-3 py-2">Grade Point</th>
                    <th className="px-3 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCourses.map((course) => (
                    <tr key={course.id} className="border-t border-gray-600">
                      <td className="px-3 py-2 font-medium text-gray-100">{course.code}</td>
                      <td className="px-3 py-2">{course.name}</td>
                      <td className="px-3 py-2">{course.credits}</td>
                      <td className="px-3 py-2">{course.grade}</td>
                      <td className="px-3 py-2">{GRADE_POINTS[course.grade]}</td>
                      <td className="px-3 py-2 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCourse(course.id)}
                          className="h-8 bg-gray-700 border-gray-600 text-gray-200 hover:bg-red-900/30 hover:border-red-800 hover:text-red-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {allCourses.length === 0 && (
              <p className="text-sm text-amber-300">No courses left in preview. Go back and add/parse again.</p>
            )}

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1)
                  setError(null)
                }}
                className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
              >
                Back to Input
              </Button>
              <Button
                onClick={calculateCGPA}
                className="bg-teal-600 hover:bg-teal-700 text-white"
                disabled={allCourses.length === 0}
              >
                <Calculator className="mr-2 h-4 w-4" /> Calculate CGPA
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && cgpa !== null && (
          <motion.div initial={false} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 shadow-lg">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Your CGPA</h3>
              <div className="text-6xl font-bold mb-4" style={{ color: getCGPAColor(cgpa) }}>
                {cgpa.toFixed(2)}
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Total Credits</span>
                  <span className="font-semibold text-gray-200">{totalCredits}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Total Courses</span>
                  <span className="font-semibold text-gray-200">{allCourses.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Total Grade Points</span>
                  <span className="font-semibold text-gray-200">{totalGradePoints}</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-600 bg-gray-700/40">
              <table className="w-full text-left text-sm text-gray-200">
                <thead className="bg-gray-700/70 text-gray-300">
                  <tr>
                    <th className="px-3 py-2">Code</th>
                    <th className="px-3 py-2">Course Name</th>
                    <th className="px-3 py-2">Credits</th>
                    <th className="px-3 py-2">Grade</th>
                    <th className="px-3 py-2">Grade Point</th>
                    <th className="px-3 py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {allCourses.map((course) => {
                    const gradePoint = GRADE_POINTS[course.grade]
                    return (
                      <tr key={course.id} className="border-t border-gray-600">
                        <td className="px-3 py-2 font-medium text-gray-100">{course.code}</td>
                        <td className="px-3 py-2">{course.name}</td>
                        <td className="px-3 py-2">{course.credits}</td>
                        <td className="px-3 py-2">{course.grade}</td>
                        <td className="px-3 py-2">{gradePoint}</td>
                        <td className="px-3 py-2">{gradePoint * course.credits}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
              >
                Edit Courses
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
              >
                Re-parse / Add More
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

function getCGPAColor(cgpa: number): string {
  if (cgpa >= 9.0) return "#10B981"
  if (cgpa >= 8.0) return "#34D399"
  if (cgpa >= 7.0) return "#06B6D4"
  if (cgpa >= 6.0) return "#22D3EE"
  if (cgpa >= 5.0) return "#F59E0B"
  return "#FBBF24"
}
