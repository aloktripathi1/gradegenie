"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  BarChart3,
  Sparkles,
  Award,
  BookOpen,
  FileText,
  Star,
  Target,
  Zap,
  Layers,
  PieChart,
  Gauge,
  Users,
  Github,
  Heart,
  GraduationCap,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientHomePage() {
  const [activeTab, setActiveTab] = useState("accuracy")
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Track scroll position for effects
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setScrolled(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't render until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-emerald-500/10 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-gradient-to-r from-emerald-500/8 to-teal-500/8 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
      </div>

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="text-center lg:text-left">
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full mb-8 relative group"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="relative flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span className="text-white font-semibold text-sm">Exclusively for IITM BS Students</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="mb-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  <span className="block text-white mb-2 drop-shadow-lg">Calculate Your</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient bg-300% drop-shadow-2xl italic">
                    Grades Instantly
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl sm:text-2xl text-white/70 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                The most accurate grade calculator & predictor for IITM BS courses with{" "}
                <span className="text-emerald-400 font-bold">course-specific formulas</span> and{" "}
                <span className="text-cyan-400 font-bold">detailed breakdowns</span>.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12 lg:mb-0"
              >
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/calculator">
                    <Button
                      size="lg"
                      className="group relative px-8 py-5rounded-2xl font-bold text-base border-0 h-auto overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center gap-3">
                        <Calculator className="h-5 w-5" />
                        <span>Start Calculating</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/predictor">
                    <Button
                      variant="outline"
                      size="lg"
                      className="group relative px-8 py-5rounded-2xl font-bold text-base h-auto border-2 border-white/20 text-white overflow-hidden bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-xl transition-all duration-300 shadow-xl hover:border-white/30"
                    >
                      <div className="relative flex items-center gap-3">
                        <Target className="h-5 w-5" />
                        <span>Try Predictor</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Hero Visual - Mock Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                {/* Mock Header */}
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Calculator className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Course</div>
                      <div className="font-semibold text-white">Python Programming</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    Foundation
                  </div>
                </div>

                {/* Mock Sliders */}
                <div className="space-y-5 mb-6">
                  {[
                    { label: "Quiz 1", value: 85, max: 100, color: "bg-violet-500" },
                    { label: "Quiz 2", value: 92, max: 100, color: "bg-blue-500" },
                    { label: "Final Exam", value: 78, max: 100, color: "bg-emerald-500" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-white font-medium">{item.value}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock Result */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/50 text-sm">Projected Grade</span>
                    <span className="text-emerald-400 font-bold text-2xl">A</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 2 }}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Elements behind card */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: BookOpen, value: "40+", label: "Courses Supported", color: "from-emerald-500 to-teal-500" },
              { icon: Users, value: "1000+", label: "Students Helped", color: "from-cyan-500 to-blue-500" },
              { icon: Award, value: "100%", label: "Accurate Formulas", color: "from-blue-500 to-indigo-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative p-10 rounded-3xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-3">{stat.value}</h3>
                  <p className="text-white/70 font-semibold text-base">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 liquid-glass"
            >
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white/80 text-xs font-medium">Premium Features</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-8"
            >
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                GradeGenie
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              Built specifically for IITM BS students with precision, elegance, and comprehensive features that make
              grade calculation effortless.
            </motion.p>
          </div>

          {/* Feature Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <Tabs defaultValue="accuracy" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-16 p-2 h-auto rounded-3xl border-0 liquid-glass">
                {[
                  { value: "accuracy", icon: Gauge, label: "Accuracy", gradient: "from-emerald-500 to-teal-500" },
                  { value: "coverage", icon: Layers, label: "Coverage", gradient: "from-cyan-500 to-blue-500" },
                  { value: "insights", icon: PieChart, label: "Insights", gradient: "from-blue-500 to-indigo-500" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`relative w-full py-5 px-4 rounded-2xl transition-all duration-500 font-medium text-sm data-[state=active]:text-white border-0 h-auto ${
                      activeTab === tab.value
                        ? `bg-gradient-to-r ${tab.gradient} shadow-lg`
                        : "bg-transparent hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="accuracy" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <LiquidFeatureCard
                    icon={<Calculator className="h-7 w-7 text-white" />}
                    title="Course-Specific Formulas"
                    description="Precise calculations using exact formulas for each IITM BS course, ensuring 100% accuracy in your grade predictions."
                    gradient="from-emerald-500 to-teal-500"
                  />
                  <LiquidFeatureCard
                    icon={<Sparkles className="h-7 w-7 text-white" />}
                    title="Smart Bonus Calculation"
                    description="Intelligent bonus mark application that automatically determines eligibility and caps scores appropriately."
                    gradient="from-cyan-500 to-blue-500"
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="coverage" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <LiquidFeatureCard
                    icon={<BookOpen className="h-7 w-7 text-white" />}
                    title="All Degrees & Levels"
                    description="Complete support for Data Science and Electronic Systems programs across Foundation, Diploma, and Degree levels."
                    gradient="from-blue-500 to-indigo-500"
                  />
                  <LiquidFeatureCard
                    icon={<FileText className="h-7 w-7 text-white" />}
                    title="Comprehensive Course Database"
                    description="Extensive database covering all courses with their unique grading patterns and assessment structures."
                    gradient="from-indigo-500 to-purple-500"
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="insights" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <LiquidFeatureCard
                    icon={<BarChart3 className="h-7 w-7 text-white" />}
                    title="Visual Score Breakdown"
                    description="Beautiful, interactive visualizations showing detailed breakdowns of your score components and contributions."
                    gradient="from-purple-500 to-pink-500"
                  />
                  <LiquidFeatureCard
                    icon={<Target className="h-7 w-7 text-white" />}
                    title="Advanced Grade Predictor"
                    description="Predict required final exam scores for target grades with intelligent recommendations and feasibility analysis."
                    gradient="from-pink-500 to-rose-500"
                  />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Additional Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Instant calculations with optimized algorithms for immediate results",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your data stays on your device - no tracking, no storage, complete privacy",
                color: "from-emerald-500 to-cyan-500",
              },
              {
                icon: Clock,
                title: "Always Available",
                description: "24/7 access with no downtime - calculate grades whenever you need",
                color: "from-blue-500 to-indigo-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl text-center transition-all duration-500 hover:scale-105 liquid-glass"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
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
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">GradeGenie</span>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex gap-8"
            >
              {[
                { href: "/calculator", label: "Calculator" },
                { href: "/predictor", label: "Predictor" },
                { href: "/about", label: "About" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/70 hover:text-white transition-all duration-300 font-medium text-base hover:scale-105"
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-white/60 mb-3 text-base">
              © {new Date().getFullYear()} GradeGenie. Not affiliated with IITM.
            </p>
            <p className="text-white/70 flex items-center justify-center gap-3 text-base">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by{" "}
              <Link
                href="https://github.com/aloktripathi1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 font-medium flex items-center gap-2 hover:scale-105"
              >
                <Github className="h-4 w-4" />
                Alok Tripathi
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Liquid Feature Card Component
function LiquidFeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  // Helper function to get gradient colors safely
  const getGradientColors = (gradientString: string) => {
    const parts = gradientString.split(" ")
    if (parts.length >= 3) {
      const fromColor = parts[0]?.replace("from-", "") || "emerald-500"
      const toColor = parts[2]?.replace("to-", "") || "teal-500"
      return { fromColor, toColor }
    }
    return { fromColor: "emerald-500", toColor: "teal-500" }
  }

  const { fromColor, toColor } = getGradientColors(gradient)

  return (
    <motion.div
      className="group relative p-8 rounded-3xl transition-all duration-700 hover:scale-105 liquid-glass"
      whileHover={{ y: -8 }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, var(--${fromColor}) 0%, var(--${toColor}) 100%)`,
        }}
      ></div>

      {/* Liquid border effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div
          className="absolute inset-0 rounded-3xl p-px"
          style={{
            background: `linear-gradient(135deg, var(--${fromColor}) 0%, var(--${toColor}) 100%)`,
          }}
        >
          <div className="w-full h-full rounded-3xl bg-slate-950/95 backdrop-blur-sm"></div>
        </div>
      </div>

      <div className="relative z-10">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/70 leading-relaxed text-base group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
