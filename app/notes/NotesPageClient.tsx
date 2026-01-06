"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, ExternalLink, Download } from "lucide-react"
import { motion } from "framer-motion"
import { courseData } from "@/lib/course-data"
import { type Course } from "@/lib/types"
import { notesData } from "@/lib/notes-data"

export default function NotesPageClient() {
  const [selectedDegree, setSelectedDegree] = useState<string>("")
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Get unique degrees
  const degrees = Array.from(new Set(courseData.map((c) => c.degree)))

  // Get levels for selected degree
  const levels = selectedDegree
    ? Array.from(new Set(courseData.filter((c) => c.degree === selectedDegree).map((c) => c.level)))
    : []

  // Get courses for selected degree and level
  const availableCourses = selectedDegree && selectedLevel
    ? courseData.filter((c) => c.degree === selectedDegree && c.level === selectedLevel)
    : []

  const handleCourseSelect = (courseName: string) => {
    const course = availableCourses.find((c) => c.name === courseName)
    setSelectedCourse(course || null)
  }

  // Get notes for selected course
  const courseNotes = selectedCourse 
    ? notesData.find((n) => n.courseId === selectedCourse.id)
    : null

  return (
    <div className="min-h-screen bg-black py-6 px-3 sm:px-6 lg:px-8 text-zinc-100 font-system">
      <div className="max-w-5xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 mb-4"
          >
            Course Notes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Access comprehensive study notes and resources for IITM BS courses
          </motion.p>
        </div>

        {/* Course Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Degree Selection */}
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-zinc-300">
                    Select Degree
                  </Label>
                  <Select value={selectedDegree} onValueChange={(value) => {
                    setSelectedDegree(value)
                    setSelectedLevel("")
                    setSelectedCourse(null)
                  }}>
                    <SelectTrigger id="degree" className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Choose degree" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {degrees.map((degree) => (
                        <SelectItem key={degree} value={degree} className="text-white hover:bg-zinc-700">
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Level Selection */}
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-zinc-300">
                    Select Level
                  </Label>
                  <Select 
                    value={selectedLevel} 
                    onValueChange={(value) => {
                      setSelectedLevel(value)
                      setSelectedCourse(null)
                    }}
                    disabled={!selectedDegree}
                  >
                    <SelectTrigger id="level" className="bg-zinc-800 border-zinc-700 text-white disabled:opacity-50">
                      <SelectValue placeholder="Choose level" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {levels.map((level) => (
                        <SelectItem key={level} value={level} className="text-white hover:bg-zinc-700">
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Selection */}
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-zinc-300">
                    Select Course
                  </Label>
                  <Select 
                    value={selectedCourse?.name || ""} 
                    onValueChange={handleCourseSelect}
                    disabled={!selectedLevel}
                  >
                    <SelectTrigger id="course" className="bg-zinc-800 border-zinc-700 text-white disabled:opacity-50">
                      <SelectValue placeholder="Choose course" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {availableCourses.map((course) => (
                        <SelectItem key={course.name} value={course.name} className="text-white hover:bg-zinc-700">
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Selected Course Notes Display */}
              {selectedCourse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 p-6 bg-zinc-800/50 rounded-lg border border-zinc-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-2 rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{selectedCourse.name}</h3>
                      <p className="text-zinc-400 mb-4">
                        {selectedCourse.degree} • {selectedCourse.level}
                      </p>
                      
                      {courseNotes && courseNotes.notesLinks.length > 0 ? (
                        <div className="space-y-3">
                          <p className="text-zinc-300 font-medium mb-3">Available Notes:</p>
                          {courseNotes.notesLinks.map((note, index) => (
                            <a
                              key={index}
                              href={note.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 bg-zinc-900/70 hover:bg-zinc-900 rounded-lg border border-zinc-700 hover:border-emerald-500/50 transition-all duration-200 group"
                            >
                              <div className="flex items-center gap-3">
                                <Download className="h-5 w-5 text-emerald-400" />
                                <div>
                                  <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                                    {note.title}
                                  </p>
                                  {note.contributor && (
                                    <p className="text-zinc-500 text-sm">- {note.contributor}</p>
                                  )}
                                </div>
                              </div>
                              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700">
                          <p className="text-zinc-300 text-center py-8">
                            Notes for this course are being compiled. Check back soon!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {!selectedCourse && selectedLevel && (
                <div className="mt-6 p-6 bg-zinc-800/50 rounded-lg border border-zinc-700 text-center">
                  <p className="text-zinc-400">Select a course to view available notes</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contribute Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-teal-900/30 to-emerald-900/30 border-teal-700/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-semibold text-white">Want to Contribute Your Notes?</h3>
                <p className="text-zinc-300 max-w-2xl mx-auto">
                  Help fellow students by sharing your course notes. Submit your notes through our Google Form and contribute to the community!
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-medium px-8 py-6 rounded-xl shadow-lg"
                >
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdOLNQ3gn4542gZ_e4OTqg2BtMfzipf3JFEF6owkcSr--thOA/viewform?usp=publish-editor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <span>Submit Your Notes</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <p className="text-zinc-500 text-sm">
                  Your contribution will be reviewed and added to help students across all levels
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
