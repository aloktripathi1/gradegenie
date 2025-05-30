import type React from "react"
import { SiteHeader } from "@/components/site-header"

export default function PredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}
