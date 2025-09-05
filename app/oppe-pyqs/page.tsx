"use client"

import { motion } from "framer-motion"
import { ExternalLink, BookOpen, FileText } from "lucide-react"

const subjects = [
  {
    name: "Python Programming",
    icon: <FileText className="h-6 w-6" />,
    url: "https://drive.google.com/drive/folders/1XYAh7kB2HpCYMP0WJW77KWZPQLXsCofU",
    description: "Previous year questions for Python programming fundamentals",
  },
  {
    name: "PDSA",
    icon: <BookOpen className="h-6 w-6" />,
    url: "https://drive.google.com/drive/folders/1mhR5LpKValVu5QYl5PNjAA8QxyNEoIjI",
    description: "Programming, Data Structures and Algorithms practice questions",
  },
  {
    name: "System Commands",
    icon: <FileText className="h-6 w-6" />,
    url: "https://drive.google.com/drive/folders/1HxeWnl9Y0U9YvcKDAdAk_iGlNwUAYfCm",
    description: "System commands and shell scripting questions",
  },
  {
    name: "DBMS",
    icon: <BookOpen className="h-6 w-6" />,
    url: "https://drive.google.com/file/d/1x-QQUBQ9CVLzwsiDdxpxc0s5cfdomB5_/view?usp=drivesdk",
    description: "Database Management Systems previous year questions",
  },
  {
    name: "JAVA",
    icon: <FileText className="h-6 w-6" />,
    url: "https://docs.google.com/spreadsheets/d/1m7PyyUxsVLEYX6h1nNDNrXsee-uJd-gB6M_giEpOuLo/edit?usp=drivesdk",
    description: "Java programming language practice questions",
  },
]

export default function OppePyqsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              OPPE{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">PYQs</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Access previous year questions for all subjects. Practice with real exam questions to boost your
              preparation.
            </p>
          </motion.div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <a href={subject.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 h-full transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                      {subject.icon}
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                          {subject.name}
                        </h3>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300" />
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed">{subject.description}</p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">All resources are regularly updated</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
