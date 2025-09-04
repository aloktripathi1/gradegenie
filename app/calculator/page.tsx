import GradeCalculator from "@/components/grade-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GradeGenie - Grade Calculator",
  description: "Calculate your final score and grade based on course-specific grading patterns",
}

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-black py-6 px-3 sm:px-6 lg:px-8 text-zinc-100">
      <div className="max-w-5xl mx-auto pt-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 mb-2">
          Grade Calculator
        </h1>
        <p className="text-center text-zinc-500 mb-6 sm:mb-8 text-sm sm:text-base">
          Calculate your final score and grade based on course-specific grading patterns
        </p>
        <GradeCalculator />
      </div>
    </div>
  )
}
