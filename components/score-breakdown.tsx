"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  FileText,
  BookOpen,
  Award,
  BarChart3,
  Sparkles,
  PieChart,
  HelpCircle,
  Star,
  Lightbulb,
  Flame,
} from "lucide-react"

interface ComponentScore {
  value: number
  weight: number
  contribution: number
}

interface ScoreBreakdownProps {
  componentScores: Record<string, ComponentScore>
  totalScore: number
}

export function ScoreBreakdown({ componentScores, totalScore }: ScoreBreakdownProps) {
  // Sort components by contribution (highest first)
  const sortedComponents = Object.entries(componentScores).sort(([, a], [, b]) => b.contribution - a.contribution)

  // Component labels mapping for better display
  const componentLabels: Record<string, string> = {
    GAA: "Assignment Average",
    GAA1: "Assignment 1",
    GAA2: "Assignment 2",
    Qz1: "Quiz 1",
    Qz2: "Quiz 2",
    F: "Final Exam",
    PE1: "Programming Exam 1",
    PE2: "Programming Exam 2",
    OPPE1: "Online Programming Exam 1",
    OPPE2: "Online Programming Exam 2",
    Bonus: "Bonus Marks",
    // Add more mappings as needed
  }

  // Get icon for component
  const getComponentIcon = (componentId: string) => {
    if (componentId === "Bonus") return <Sparkles className="h-4 w-4" />
    if (componentId === "F") return <Award className="h-4 w-4" />
    if (componentId.includes("Qz")) return <BookOpen className="h-4 w-4" />
    if (componentId.includes("PE") || componentId.includes("OPPE")) return <BarChart3 className="h-4 w-4" />
    if (componentId.includes("GAA")) return <FileText className="h-4 w-4" />
    if (componentId.includes("Project")) return <Lightbulb className="h-4 w-4" />
    if (componentId.includes("Lab")) return <Flame className="h-4 w-4" />
    return <Star className="h-4 w-4" />
  }

  return (
    <Card className="bg-black border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
      <CardHeader className="border-b border-zinc-800 pb-3 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900">
        <CardTitle className="text-lg font-medium text-zinc-300 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-teal-400" />
          Score Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-5">
        <div className="space-y-4">
          {sortedComponents.map(([componentId, score], index) => {
            // Skip components with zero contribution
            if (score.contribution === 0) return null

            // Determine color based on component type
            const gradientColor = getGradientColor(componentId)
            const iconColor = getIconColor(componentId)

            return (
              <div key={componentId} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md bg-zinc-900 border border-zinc-800 ${iconColor.border}`}>
                      <span className={`${iconColor.text}`}>{getComponentIcon(componentId)}</span>
                    </div>
                    <span className="text-zinc-400 font-medium group-hover:text-cyan-400 transition-colors">
                      {componentLabels[componentId] || componentId}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3.5 w-3.5 text-zinc-600 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                          <p>
                            Value: {score.value.toFixed(1)}
                            <br />
                            Weight: {(score.weight * 100).toFixed(0)}%<br />
                            Contribution: {score.contribution.toFixed(1)} points
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-300 font-medium">{score.value.toFixed(1)}</span>
                  </div>
                </div>
                <motion.div
                  className="h-2.5 rounded-full bg-zinc-900 overflow-hidden p-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: gradientColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(score.contribution / totalScore) * 100}%` }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                  />
                </motion.div>
              </div>
            )
          })}

          {/* Total Score Bar */}
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <div className="flex justify-between items-center text-sm mb-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-zinc-900 border border-teal-900">
                  <Award className="h-4 w-4 text-teal-400" />
                </div>
                <span className="text-zinc-300 font-semibold">Total Score</span>
              </div>
              <span className="text-zinc-300 font-semibold">{totalScore.toFixed(2)}</span>
            </div>
            <div className="h-3 rounded-full bg-zinc-900 overflow-hidden p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-600"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(totalScore, 100)}%` }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-zinc-600 mt-1">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getIconColor(componentId: string): { text: string; border: string } {
  // Bonus is always green
  if (componentId === "Bonus") return { text: "text-green-400", border: "border-green-900" }

  // Final exam is blue
  if (componentId === "F") return { text: "text-cyan-400", border: "border-cyan-900" }

  // Quizzes are slate
  if (componentId.includes("Qz")) return { text: "text-slate-400", border: "border-slate-900" }

  // Programming exams are teal
  if (componentId.includes("PE") || componentId.includes("OPPE"))
    return { text: "text-teal-400", border: "border-teal-900" }

  // Assignments are orange
  if (componentId.includes("GAA")) return { text: "text-amber-400", border: "border-amber-900" }

  // Projects are yellow
  if (componentId.includes("Project")) return { text: "text-yellow-400", border: "border-yellow-900" }

  // Labs are orange
  if (componentId.includes("Lab")) return { text: "text-orange-400", border: "border-orange-900" }

  // Default color for other components
  return { text: "text-pink-400", border: "border-pink-900" }
}

function getGradientColor(componentId: string): string {
  // Bonus is always green gradient
  if (componentId === "Bonus") return "linear-gradient(90deg, #10B981, #34D399)"

  // Final exam is blue gradient
  if (componentId === "F") return "linear-gradient(90deg, #2563EB, #3B82F6)"

  // Quizzes are purple gradient
  if (componentId.includes("Qz")) return "linear-gradient(90deg, #7C3AED, #8B5CF6)"

  // Programming exams are teal gradient
  if (componentId.includes("PE") || componentId.includes("OPPE")) return "linear-gradient(90deg, #0D9488, #14B8A6)"

  // Assignments are orange gradient
  if (componentId.includes("GAA")) return "linear-gradient(90deg, #D97706, #F59E0B)"

  // Projects are yellow gradient
  if (componentId.includes("Project")) return "linear-gradient(90deg, #CA8A04, #EAB308)"

  // Labs are orange gradient
  if (componentId.includes("Lab")) return "linear-gradient(90deg, #EA580C, #F97316)"

  // Default gradient for other components
  return "linear-gradient(90deg, #DB2777, #EC4899)"
}
