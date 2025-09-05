"use client"

import Link from "next/link"
import { GraduationCap, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Render immediately without waiting for mount
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark shadow-lg shadow-black/10" : "bg-transparent"
      }`}
      style={{
        background: scrolled ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 opacity-20 blur-md"></div>
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">GradeGenie</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            >
              Home
            </Link>
            <Link
              href="/calculator"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            >
              Calculator
            </Link>
            <Link
              href="/predictor"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            >
              Predictor
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/10 backdrop-blur-sm"
              >
                Resources
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mounted && (
                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 shadow-xl overflow-hidden"
                    >
                      <a
                        href="https://quizpractice.space/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                        onClick={() => setResourcesOpen(false)}
                      >
                        Practice PYQ
                      </a>
                      <Link
                        href="/oppe-pyqs"
                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                        onClick={() => setResourcesOpen(false)}
                      >
                        OPPE PYQs
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mounted ? (
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mounted && (
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
              >
                <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl mt-4 p-4 space-y-2 border border-white/10 shadow-xl">
                  <Link
                    href="/"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/calculator"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Calculator
                  </Link>
                  <Link
                    href="/predictor"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Predictor
                  </Link>

                  {/* Mobile Resources Section */}
                  <div className="border-t border-white/10 pt-2 mt-2">
                    <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Resources
                    </div>
                    <a
                      href="https://quizpractice.space/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Practice PYQ
                    </a>
                    <Link
                      href="/oppe-pyqs"
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      OPPE PYQs
                    </Link>
                  </div>

                  <Link
                    href="/about"
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
  )
}
