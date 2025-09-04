import ClientHomePage from "./ClientHomePage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GradeGenie - IITM BS Grade Calculator",
  description: "Calculate your grades for IITM BS courses with our specialized grade calculator",
}

export default function HomePage() {
  return <ClientHomePage />
}
