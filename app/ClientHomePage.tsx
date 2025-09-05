"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calculator,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Github,
  Heart,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function ClientHomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <SiteHeader />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Exclusively for IITM BS Students
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-space-grotesk">
              <span className="text-white">Grade</span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Genie
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Your intelligent companion for grade calculation and prediction.
              <br className="hidden md:block" />
              Calculate current grades and predict future outcomes with precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/calculator">
                <Button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
                  <Calculator className="mr-2 h-5 w-5" />
                  Start Calculating
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>

              <Link href="/predictor">
                <Button
                  variant="outline"
                  className="px-8 py-4 border-2 border-gray-700 text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 font-semibold rounded-xl transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Predict Grades
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful tools designed to help you track, calculate, and predict your academic performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calculator className="h-8 w-8" />,
                title: "Grade Calculator",
                description:
                  "Calculate your current grades with precision using our advanced algorithms tailored for different grading systems.",
                href: "/calculator",
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Grade Predictor",
                description:
                  "Predict your future grades based on current performance and upcoming assignments with AI-powered insights.",
                href: "/predictor",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Study Resources",
                description:
                  "Access comprehensive study materials, practice questions, and notes to boost your academic performance.",
                href: "/oppe-pyqs",
                gradient: "from-blue-500 to-purple-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={feature.href} className="group block h-full">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 h-full transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed mb-6">{feature.description}</p>

                    <div className="flex items-center text-emerald-400 font-medium group-hover:gap-2 transition-all duration-300">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: <Target className="h-8 w-8" />, number: "99.9%", label: "Accuracy Rate" },
              { icon: <Zap className="h-8 w-8" />, number: "5K+", label: "Calculations Done" },
              { icon: <BookOpen className="h-8 w-8" />, number: "60+", label: "Courses Supported" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900/30 to-gray-800/20 backdrop-blur-sm border border-gray-700/30"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to take control of your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                grades
              </span>
              ?
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of students who are already using GradeGenie to improve their academic performance.
            </p>

            <Link href="/calculator">
              <Button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8 md:mb-0"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">GradeGenie</span>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex gap-10"
            >
              {[
                { href: "/calculator", label: "Calculator" },
                { href: "/predictor", label: "Predictor" },
                { href: "/about", label: "About" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/70 hover:text-white transition-all duration-300 font-medium text-lg hover:scale-105"
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-white/60 mb-3 text-lg">
              © {new Date().getFullYear()} GradeGenie. Not affiliated with IITM.
            </p>
            <p className="text-white/70 flex items-center justify-center gap-3 text-lg">
              Made with <Heart className="h-5 w-5 text-red-500 animate-pulse" /> by{" "}
              <Link
                href="https://github.com/aloktripathi1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 font-medium flex items-center gap-2 hover:scale-105"
              >
                <Github className="h-5 w-5" />
                Alok Tripathi
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
