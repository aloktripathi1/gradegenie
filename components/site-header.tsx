"use client"

import Link from "next/link"
import { GraduationCap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-1.5 rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-zinc-200 hidden sm:inline-block">GradeGenie</span>
            <span className="font-semibold text-zinc-200 sm:hidden">GradeGenie</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-teal-400 transition-colors">
            Home
          </Link>
          <Link href="/calculator" className="text-sm font-medium text-zinc-400 hover:text-teal-400 transition-colors">
            Grade Calculator
          </Link>
          <Link href="/predictor" className="text-sm font-medium text-zinc-400 hover:text-teal-400 transition-colors">
            Grade Predictor
          </Link>
          <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-teal-400 transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-zinc-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 right-0 bg-black border-b border-zinc-800 md:hidden z-50"
            >
              <div className="container py-4 flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-teal-400 transition-colors px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/calculator"
                  className="text-zinc-400 hover:text-teal-400 transition-colors px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Grade Calculator
                </Link>
                <Link
                  href="/predictor"
                  className="text-zinc-400 hover:text-teal-400 transition-colors px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Grade Predictor
                </Link>
                <Link
                  href="/about"
                  className="text-zinc-400 hover:text-teal-400 transition-colors px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
