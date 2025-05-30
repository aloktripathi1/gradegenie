import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "GradeGenie - About",
  description: "Learn about the creator of GradeGenie and the story behind this IITM BS grade calculator",
}

export default function AboutPage() {
  return <AboutPageClient />
}
