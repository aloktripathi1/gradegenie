import type React from "react"
import { SiteHeader } from "@/components/site-header"

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      <main className="relative">{children}</main>
    </div>
  )
}
