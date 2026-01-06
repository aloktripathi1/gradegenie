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
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [pyqsDropdownOpen, setPyqsDropdownOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const [mobilePyqsOpen, setMobilePyqsOpen] = useState(false)

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "shadow-xl shadow-black/10" : "bg-transparent"
      }`}
      style={{
        background: scrolled ? "rgba(8, 12, 20, 0.9)" : "rgba(8, 12, 20, 0.6)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all duration-300">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GradeGenie</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button className="px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 relative group flex items-center gap-1">
                <span className="relative z-10">Tools</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl py-2 z-50"
                  >
                    <Link
                      href="/calculator"
                      className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      grade calculator
                    </Link>
                    <Link
                      href="/predictor"
                      className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      grade predictor
                    </Link>
                    <Link
                      href="/cgpa"
                      className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      cgpa calculator
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/notes"
              className="px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 relative group"
            >
              <span className="relative z-10">Notes</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* PYQs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPyqsDropdownOpen(true)}
              onMouseLeave={() => setPyqsDropdownOpen(false)}
            >
              <button className="px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 relative group flex items-center gap-1">
                <span className="relative z-10">PYQs</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${pyqsDropdownOpen ? 'rotate-180' : ''}`} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <AnimatePresence>
                {pyqsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl py-2 z-50"
                  >
                    <a
                      href="https://quizpractice.space"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      Quiz Practice
                    </a>
                    <a
                      href="https://docs.google.com/spreadsheets/u/0/d/1x5KAXRlvZLvRjrRfIxFWuNpc8wwboLc21PpYKn8Fv90/htmlview#gid=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      PYQs Sheet
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className="px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 relative group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/5"
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
                  {/* Mobile Tools Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                    >
                      <span>Tools</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileToolsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 mt-2 space-y-2"
                        >
                          <Link
                            href="/calculator"
                            className="block px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            grade calculator
                          </Link>
                          <Link
                            href="/predictor"
                            className="block px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            grade predictor
                          </Link>
                          <Link
                            href="/cgpa"
                            className="block px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            cgpa calculator
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Link
                      href="/notes"
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Notes
                    </Link>
                  </motion.div>

                  {/* Mobile PYQs Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setMobilePyqsOpen(!mobilePyqsOpen)}
                    >
                      <span>PYQs</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobilePyqsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobilePyqsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 mt-2 space-y-2"
                        >
                          <a
                            href="https://quizpractice.space"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                          >
                            Quiz Practice
                          </a>
                          <a
                            href="https://docs.google.com/spreadsheets/u/0/d/1x5KAXRlvZLvRjrRfIxFWuNpc8wwboLc21PpYKn8Fv90/htmlview#gid=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                          >
                            PYQs Sheet
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Link
                      href="/about"
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
  )
}
