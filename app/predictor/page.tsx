import type { Metadata } from "next"
import GradePredictor from "@/components/grade-predictor"

export const metadata: Metadata = {
  title: "GradeGenie - Grade Predictor",
  description: "Predict the minimum final exam score needed to achieve your target grade",
}

export default function PredictorPage() {
  return (
    <main className="min-h-screen bg-black py-6 px-3 sm:px-6 lg:px-8 text-zinc-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-500 mb-2">
          Grade Predictor
        </h1>
        <p className="text-center text-zinc-500 mb-6 sm:mb-8 text-sm sm:text-base">
          Calculate what scores you need to achieve your target grade
        </p>
        <GradePredictor />
        <footer className="mt-8 sm:mt-12 text-center text-zinc-600 text-xs sm:text-sm">
          Made with ❤️ by Alok Tripathi
        </footer>
      </div>
    </main>
  )
}
