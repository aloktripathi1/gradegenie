import type { Metadata } from "next"
import NotesPageClient from "./NotesPageClient"

export const metadata: Metadata = {
  title: "GradeGenie - Notes",
  description: "Study notes and resources for IITM BS courses",
}

export default function NotesPage() {
  return <NotesPageClient />
}
