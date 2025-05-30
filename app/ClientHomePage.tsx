"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Calculator,
  BarChart3,
  Sparkles,
  ChevronRight,
  Award,
  BookOpen,
  FileText,
  Star,
  ArrowRight,
  CheckCircle2,
  Target,
  Info,
  Zap,
  Layers,
  PieChart,
  Gauge,
  Rocket,
  Scroll,
  Users,
  Clock,
  Brain,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientHomePage() {
  const [activeTab, setActiveTab] = useState("accuracy")
  const [scrolled, setScrolled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentGrade, setCurrentGrade] = useState("A")
  const [currentScore, setCurrentScore] = useState(85)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [particleCount, setParticleCount] = useState(20)

  // Interactive grade animation
  const grades = ["S", "A", "B", "C", "D", "E", "F"]
  const gradeColors = {
    S: "from-emerald-400 to-teal-500",
    A: "from-blue-400 to-indigo-500",
    B: "from-violet-400 to-purple-500",
    C: "from-yellow-400 to-amber-500",
    D: "from-orange-400 to-red-500",
    E: "from-red-400 to-pink-500",
    F: "from-red-500 to-rose-600",
  }

  // Track scroll position for sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Interactive grade cycling
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentGrade((prev) => {
        const currentIndex = grades.indexOf(prev)
        const nextIndex = (currentIndex + 1) % grades.length
        return grades[nextIndex]
      })

      setCurrentScore((prev) => {
        const variation = Math.random() * 20 - 10
        return Math.max(0, Math.min(100, prev + variation))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Scroll to calculator section
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("calculator-section")
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Add smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <SiteHeader />

      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-16 sm:pt-8 sm:pb-20 z-10">
        {/* Enhanced Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-600/10 to-emerald-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-600/10 to-rose-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-violet-600/10 to-pink-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <motion.div
                className="bg-gradient-to-r from-teal-500 to-emerald-600 p-3 rounded-xl shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <GraduationCap className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl font-bold tracking-tight mb-2 leading-tight text-[#f4f4f4]"
            >
              Grade Smarter. Instantly.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-300 text-lg mb-8"
            >
              Calculate your IITM BS grades with precision. No more guesswork, just accurate results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/calculator">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-700/10 transition-all flex items-center gap-2 rounded-lg h-12 px-8 w-full sm:w-auto text-base relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Calculator className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Calculate Now</span>
                    <ChevronRight className="h-4 w-4 ml-1 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>

              <Link href="#features">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 transition-all flex items-center gap-2 rounded-lg h-12 px-6 w-full sm:w-auto text-base hover:border-zinc-700"
                  >
                    <Sparkles className="h-5 w-5 text-amber-400" /> Explore Features
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Modern Animated Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {/* Card 1 */}
            <motion.div
              className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-2 rounded-lg w-fit mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-200 mb-2">Accurate Calculations</h3>
                <p className="text-zinc-400 text-sm">Precise grade calculations using official IITM BS formulas</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-lg w-fit mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-200 mb-2">Grade Predictor</h3>
                <p className="text-zinc-400 text-sm">Predict what you need to achieve your target grade</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-2 rounded-lg w-fit mb-4">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-200 mb-2">Instant Results</h3>
                <p className="text-zinc-400 text-sm">Get your grades calculated in seconds, no waiting</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-zinc-950/50 relative">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20,184,166,0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-gradient-to-r from-teal-900/50 to-emerald-900/50 p-2 rounded-lg mb-4"
            >
              <Sparkles className="h-6 w-6 text-teal-400" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 mb-4"
            >
              Powerful Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-300 max-w-2xl mx-auto"
            >
              Our calculator is specifically designed for IITM BS students with all the features you need to accurately
              calculate your grades.
            </motion.p>
          </div>

          {/* Enhanced Tabbed Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <Tabs defaultValue="accuracy" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
                <TabsTrigger
                  value="accuracy"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600/80 data-[state=active]:to-emerald-600/80 data-[state=active]:text-white rounded-md py-3 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    <span>Accuracy</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="coverage"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/80 data-[state=active]:to-indigo-600/80 data-[state=active]:text-white rounded-md py-3 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <span>Coverage</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600/80 data-[state=active]:to-rose-600/80 data-[state=active]:text-white rounded-md py-3 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    <span>Insights</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="accuracy" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FeatureCard
                    icon={<Calculator className="h-6 w-6 text-white" />}
                    title="Course-Specific Formulas"
                    description="Accurate grade calculations using the exact formulas for each IITM BS course, ensuring precise results."
                    gradient="from-teal-500 to-emerald-600"
                    preview={
                      <div className="text-xs font-mono bg-zinc-900/80 p-2 rounded-md text-zinc-300 border border-zinc-800">
                        T = 0.1 * GAA + max(0.6 * F + 0.2 * max(Qz1, Qz2), 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2)
                      </div>
                    }
                  />

                  <FeatureCard
                    icon={<Sparkles className="h-6 w-6 text-white" />}
                    title="Bonus Marks Calculation"
                    description="Automatically applies bonus marks only when eligible (score ≥ 40) and caps the total at 100."
                    gradient="from-amber-500 to-orange-600"
                    preview={
                      <div className="flex items-center gap-2 text-xs bg-zinc-900/80 p-2 rounded-md border border-zinc-800">
                        <div className="text-green-400 font-medium">+5 Bonus</div>
                        <ArrowRight className="h-3 w-3 text-zinc-500" />
                        <div className="text-zinc-300">
                          Score: <span className="text-blue-400">45</span> →{" "}
                          <span className="text-emerald-400">50</span>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="coverage" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FeatureCard
                    icon={<BookOpen className="h-6 w-6 text-white" />}
                    title="All Degrees & Levels"
                    description="Supports both Data Science and Electronic Systems degrees across Foundation, Diploma, and Degree levels."
                    gradient="from-blue-500 to-indigo-600"
                    preview={
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-zinc-900/80 p-2 rounded-md border border-zinc-800 text-center">
                          <div className="text-blue-400 font-medium">Data Science</div>
                        </div>
                        <div className="bg-zinc-900/80 p-2 rounded-md border border-zinc-800 text-center">
                          <div className="text-purple-400 font-medium">Electronic Systems</div>
                        </div>
                      </div>
                    }
                  />

                  <FeatureCard
                    icon={<FileText className="h-6 w-6 text-white" />}
                    title="Comprehensive Course List"
                    description="Includes all courses from both degrees with their specific grading patterns and assessment components."
                    gradient="from-purple-500 to-violet-600"
                    preview={
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1 bg-zinc-900/80 px-2 py-1 rounded-md border border-zinc-800">
                          <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                          <div className="text-zinc-300">Mathematics 1</div>
                        </div>
                        <div className="flex items-center gap-1 bg-zinc-900/80 px-2 py-1 rounded-md border border-zinc-800">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <div className="text-zinc-300">Python Programming</div>
                        </div>
                        <div className="flex items-center gap-1 bg-zinc-900/80 px-2 py-1 rounded-md border border-zinc-800">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <div className="text-zinc-300">+40 more courses</div>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="insights" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FeatureCard
                    icon={<BarChart3 className="h-6 w-6 text-white" />}
                    title="Visual Score Breakdown"
                    description="See a detailed visual breakdown of how each component contributes to your final score."
                    gradient="from-amber-500 to-orange-600"
                    preview={
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between items-center">
                          <div className="text-zinc-300">Assignments</div>
                          <div className="text-amber-400">10%</div>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "10%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-zinc-300">Final Exam</div>
                          <div className="text-blue-400">40%</div>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "40%" }}
                            transition={{ duration: 1, delay: 0.7 }}
                          />
                        </div>
                      </div>
                    }
                  />

                  <FeatureCard
                    icon={<Target className="h-6 w-6 text-white" />}
                    title="Grade Predictor"
                    description="Predict the minimum final exam score you need to achieve each grade based on your current scores."
                    gradient="from-rose-500 to-pink-600"
                    preview={
                      <div className="flex items-center justify-between text-xs bg-zinc-900/80 p-2 rounded-md border border-zinc-800">
                        <div className="text-zinc-300">
                          For grade <span className="text-emerald-400 font-bold">S</span>:
                        </div>
                        <div className="text-zinc-300">
                          Need <span className="text-rose-400 font-bold">85+</span> in Final
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              </TabsContent>

              {/* Enhanced Additional Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
              >
                <motion.div
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all hover:scale-105"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-amber-900/30 text-amber-400">
                      <Zap className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-300">Fast Calculations</h3>
                  </div>
                  <p className="text-xs text-zinc-400">Get instant results with our optimized calculation engine.</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all hover:scale-105"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-emerald-900/30 text-emerald-400">
                      <Rocket className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-300">Mobile Friendly</h3>
                  </div>
                  <p className="text-xs text-zinc-400">Calculate your grades on any device, anywhere, anytime.</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all hover:scale-105"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-blue-900/30 text-blue-400">
                      <Star className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-300">Always Free</h3>
                  </div>
                  <p className="text-xs text-zinc-400">
                    No hidden costs, no subscriptions. Free forever for all students.
                  </p>
                </motion.div>
              </motion.div>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-gradient-to-r from-amber-900/50 to-rose-900/50 p-2 rounded-lg mb-4"
            >
              <Scroll className="h-6 w-6 text-amber-400" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-500 mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-300 max-w-2xl mx-auto"
            >
              Calculate your grade in just a few simple steps and get accurate results instantly.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <motion.div
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-xl h-full hover:border-amber-800 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute -top-3 -left-3 bg-gradient-to-r from-amber-500 to-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
                <div className="pt-4 flex flex-col items-center text-center">
                  <motion.div className="bg-amber-900/30 p-3 rounded-lg mb-4" whileHover={{ rotate: 5 }}>
                    <BookOpen className="h-6 w-6 text-amber-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-zinc-200 mb-2">Select Your Course</h3>
                  <p className="text-zinc-400 text-sm">
                    Choose your degree, level, and specific course from the comprehensive list of IITM BS courses.
                  </p>
                </div>
              </motion.div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                    <ArrowRight className="h-6 w-6 text-amber-500" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-xl h-full hover:border-rose-800 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute -top-3 -left-3 bg-gradient-to-r from-rose-500 to-pink-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
                <div className="pt-4 flex flex-col items-center text-center">
                  <motion.div className="bg-rose-900/30 p-3 rounded-lg mb-4" whileHover={{ rotate: -5 }}>
                    <FileText className="h-6 w-6 text-rose-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-zinc-200 mb-2">Enter Your Scores</h3>
                  <p className="text-zinc-400 text-sm">
                    Input your scores for each assessment component and add any bonus marks you've earned.
                  </p>
                </div>
              </motion.div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    <ArrowRight className="h-6 w-6 text-rose-500" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative"
            >
              <motion.div
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-xl h-full hover:border-teal-800 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute -top-3 -left-3 bg-gradient-to-r from-teal-500 to-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
                <div className="pt-4 flex flex-col items-center text-center">
                  <motion.div className="bg-teal-900/30 p-3 rounded-lg mb-4" whileHover={{ scale: 1.1 }}>
                    <Award className="h-6 w-6 text-teal-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-zinc-200 mb-2">Get Your Grade</h3>
                  <p className="text-zinc-400 text-sm">
                    View your calculated grade, final score, and a detailed breakdown of your performance.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Enhanced Decorative elements */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden"
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-transparent to-emerald-500/20 animate-pulse"></div>
            </div>

            <motion.div className="flex justify-center mb-6" whileHover={{ scale: 1.1, rotate: 5 }}>
              <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-amber-500"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              Ready to Calculate Your Grade?
            </motion.h2>
            <p className="text-zinc-300 text-lg max-w-2xl mx-auto mb-8">
              Get accurate grade calculations for all your IITM BS courses in seconds. No registration required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/calculator">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-700/10 transition-all flex items-center gap-2 rounded-lg h-12 px-8 w-full sm:w-auto text-base relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Calculator className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Calculate Now</span>
                    <ChevronRight className="h-4 w-4 ml-1 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/predictor">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white shadow-lg shadow-amber-700/10 transition-all flex items-center gap-2 rounded-lg h-12 px-8 w-full sm:w-auto text-base">
                    <Target className="h-5 w-5" /> Try Grade Predictor <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </motion.div>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-zinc-400">
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                <span>No registration required</span>
              </motion.div>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                <span>100% accurate formulas</span>
              </motion.div>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                <span>Free to use</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <motion.div
                className="bg-gradient-to-r from-teal-500 to-emerald-600 p-1.5 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <GraduationCap className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-lg font-semibold text-zinc-300">GradeGenie</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <Link href="/calculator" className="text-zinc-400 hover:text-teal-400 transition-colors">
                Calculator
              </Link>
              <Link href="/predictor" className="text-zinc-400 hover:text-teal-400 transition-colors">
                Grade Predictor
              </Link>
              <Link href="/about" className="text-zinc-400 hover:text-teal-400 transition-colors">
                About
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-500 text-sm mb-4 md:mb-0">
              Made with ❤️ by Alok Tripathi. Not affiliated with IITM.
            </p>
            <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} GradeGenie</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Enhanced Grade Marker Component
function GradeMarker({ grade, position }) {
  const [isActive, setIsActive] = useState(false)
  const [currentGrade, setCurrentGrade] = useState("A")
  const color = currentGrade === grade ? "text-white" : "text-zinc-500"

  return (
    <motion.div
      className="absolute transform -translate-x-1/2"
      style={{ left: position }}
      whileHover={{ scale: 1.2 }}
      animate={{ scale: isActive ? 1.2 : 1 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className={`h-8 w-0.5 ${isActive ? "bg-white" : "bg-zinc-700"}`}></div>
      <motion.div
        className={`text-lg font-bold ${color} mt-1 ${isActive ? "drop-shadow-lg" : ""}`}
        animate={{
          textShadow: isActive ? "0 0 10px currentColor" : "none",
        }}
      >
        {grade}
      </motion.div>
    </motion.div>
  )
}

// Simplified Component Card
function ComponentCard({ icon, name, weight, color }) {
  return (
    <motion.div
      className="bg-zinc-800/30 border border-zinc-700 rounded-lg p-3 flex items-center gap-2 hover:border-zinc-600 transition-all"
      whileHover={{ scale: 1.02 }}
    >
      <div className={`${color}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-zinc-300 truncate">{name}</div>
        <div className="text-xs text-zinc-500">{weight}</div>
      </div>
    </motion.div>
  )
}

// Enhanced Feature Card Component
function FeatureCard({ icon, title, description, gradient, preview }) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <motion.div
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-lg hover:border-zinc-700 transition-all duration-300 relative overflow-hidden group cursor-pointer"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Animated background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${gradient.split(" ")[0]?.replace("from-", "") || "transparent"}, ${gradient.split(" ")[1]?.replace("to-", "") || "transparent"})`,
        }}
      />

      <div className="flex items-center gap-3 mb-3 relative z-10">
        <motion.div
          className={`bg-gradient-to-br ${gradient} p-2 rounded-lg shadow-md`}
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-zinc-200">{title}</h3>
      </div>
      <p className="text-zinc-400 text-sm mb-4 relative z-10">{description}</p>

      {/* Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 relative z-10"
          >
            {preview}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info icon */}
      <motion.div
        className="absolute bottom-3 right-3 text-zinc-600 group-hover:text-zinc-400 transition-colors"
        whileHover={{ scale: 1.2 }}
      >
        <Info className="h-4 w-4" />
      </motion.div>
    </motion.div>
  )
}

// Enhanced Stat Card Component
function StatCard({ icon, value, label }) {
  return (
    <motion.div
      className="bg-zinc-800/30 rounded-lg p-3 text-center border border-zinc-700 hover:border-zinc-600 transition-all"
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <motion.div className="flex justify-center mb-1" whileHover={{ rotate: 5 }}>
        <div className="text-teal-400">{icon}</div>
      </motion.div>
      <motion.div
        className="text-lg font-bold text-white"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-zinc-400">{label}</div>
    </motion.div>
  )
}
