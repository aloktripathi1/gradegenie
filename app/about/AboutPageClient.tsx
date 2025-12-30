"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Github, Linkedin, Heart, Code, Calculator } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-black py-6 px-3 sm:px-6 lg:px-8 text-zinc-100">
      <div className="max-w-4xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-3 rounded-xl shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 mb-4"
          >
            About GradeGenie
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-300 text-lg max-w-2xl mx-auto"
          >
            A specialized grade calculator built by an IITM BS student, for IITM BS students.
          </motion.p>
        </div>

        {/* About the Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-200">The Project</h2>
              </div>

              <div className="space-y-4 text-zinc-300">
                <p>
                  GradeGenie was born out of a simple need - to accurately calculate grades for IITM BS courses without
                  the hassle of manual formula calculations. As a student myself, I found it frustrating to repeatedly
                  calculate grades using complex formulas that vary from course to course.
                </p>

                <p>
                  This tool implements the exact grading formulas used by IITM BS for each course, ensuring 100%
                  accuracy in your grade calculations. Whether you're checking your current standing or predicting what
                  you need for your target grade, GradeGenie has you covered.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-teal-400 mb-1">40+</div>
                    <div className="text-sm text-zinc-400">Courses Supported</div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">100%</div>
                    <div className="text-sm text-zinc-400">Formula Accuracy</div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-amber-400 mb-1">Free</div>
                    <div className="text-sm text-zinc-400">Always & Forever</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* About the Creator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-200">About the Creator</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4 text-zinc-300">
                  <p>
                    Hi! I'm <span className="text-teal-400 font-semibold">Alok Tripathi</span>, a Diploma level student
                    at the Indian Institute of Technology Madras (IITM) Bachelor of Science program. I'm passionate
                    about technology, programming, and creating tools that make student life easier.
                  </p>

                  <p>
                    As a fellow IITM BS student, I understand the challenges we face with grade calculations. That's why
                    I built GradeGenie - to save time and eliminate the guesswork from grade calculations.
                  </p>
                  

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="https://github.com/aloktripathi1" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 flex items-center gap-2 w-full sm:w-auto">
                        <Github className="h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                    <Link href="https://linkedin.com/in/aloktripathi1" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 w-full sm:w-auto">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-white">AT</span>
                    </div>
                    <h3 className="font-semibold text-zinc-200 mb-1">Alok Tripathi</h3>
                    <p className="text-sm text-zinc-400 mb-2">IITM BS Diploma Student</p>
                    <p className="text-xs text-zinc-500">Developer & Student</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border border-zinc-800 shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-200 mb-3">Let's Connect!</h3>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Have suggestions, found a bug, or just want to say hi? I'd love to hear from you! Connect with me on
                LinkedIn or check out my other projects on GitHub.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/calculator">
                  <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white flex items-center gap-2 w-full sm:w-auto">
                    <Calculator className="h-4 w-4" />
                    Try Grade Calculator
                  </Button>
                </Link>
                <Link href="/predictor">
                  <Button
                    variant="outline"
                    className="bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:bg-zinc-800/80 flex items-center gap-2 w-full sm:w-auto"
                  >
                    <GraduationCap className="h-4 w-4" />
                    Try Grade Predictor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <footer className="mt-12 text-center text-zinc-600 text-sm">
          Made with ❤️ by Alok Tripathi • Not affiliated with IIT Madras
        </footer>
      </div>
    </div>
  )
}
