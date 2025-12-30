// Helper function to safely get a value from the values object, defaulting to 0 if undefined
function getValue(values: Record<string, number>, key: string): number {
  return values[key] ?? 0
}

export function calculateScore(courseId: string, inputValues: Record<string, number>): number {
  // Create a Proxy that returns 0 for undefined properties to prevent NaN
  const values = new Proxy(inputValues, {
    get(target, prop: string) {
      return target[prop] ?? 0
    }
  })
  
  switch (courseId) {
    // Foundation Level
    case "mds1":
    case "eng1":
    case "ct":
      return Math.max(
        0.6 * values.F + 0.3 * Math.max(values.Qz1, values.Qz2),
        0.45 * values.F + 0.25 * values.Qz1 + 0.3 * values.Qz2,
      )

    case "mds2":
      return Math.min(
        Math.max(
          0.6 * values.F + 0.3 * Math.max(values.Qz1, values.Qz2),
          0.45 * values.F + 0.25 * values.Qz1 + 0.3 * values.Qz2,
        ) + (values.B || 0),
        100,
      )

    case "eng2":
      return Math.max(
        0.6 * values.F + 0.3 * Math.max(values.Qz1, values.Qz2),
        0.45 * values.F + 0.25 * values.Qz1 + 0.3 * values.Qz2,
      )

    case "stats1":
    case "stats2":
      return (
        Math.max(
          0.6 * values.F + 0.3 * Math.max(values.Qz1, values.Qz2),
          0.45 * values.F + 0.25 * values.Qz1 + 0.3 * values.Qz2,
        ) + (values.Bonus || 0)
      )

    case "python":
      return (
        0.15 * values.Qz1 +
        0.4 * values.F +
        0.25 * Math.max(values.PE1, values.PE2) +
        0.2 * Math.min(values.PE1, values.PE2)
      )

    // Diploma Level
    case "mlf":
    case "mlt":
      return (
        0.05 * values.GAA +
        Math.max(
          0.6 * values.F + 0.25 * Math.max(values.Qz1, values.Qz2),
          0.4 * values.F + 0.25 * values.Qz1 + 0.3 * values.Qz2,
        )
      )

    case "mlp":
      return 0.1 * values.GAA + 0.3 * values.F + 0.2 * values.OPPE1 + 0.2 * values.OPPE2 + 0.2 * values.KA

    // Added missing Diploma Level courses
    case "bdm":
      return 0.3 * values.GA + 0.2 * values.Q2 + 0.2 * values.TA + 0.3 * values.F

    case "ban":
      return 0.7 * Math.max(values.Qz1, values.Qz2) + 0.3 * Math.min(values.Qz1, values.Qz2)

    case "tds":
      return 0.2 * values.GAA + 0.2 * values.ROE1 + 0.2 * values.P1 + 0.2 * values.P2 + 0.2 * values.F

    case "dl-genAI":
      return 0.2 * values.GAA + 0.15 * values.Qz1 + 0.15 * values.Qz2 + 0.2 * values.F + 0.15 * values.NPPE1 + 0.15 * values.NPPE2 

    case "pds":
    case "pdsa":
      return (
        0.05 * values.GAA +
        0.2 * values.OP +
        0.45 * values.F +
        Math.max(0.2 * Math.max(values.Qz1, values.Qz2), 0.1 * values.Qz1 + 0.2 * values.Qz2)
      )

    case "dbms":
      return (
        0.03 * values.GAA2 +
        0.02 * values.GAA3 +
        0.2 * values.OPPE +
        0.45 * values.F +
        Math.max(0.2 * Math.max(values.Qz1, values.Qz2), 0.1 * values.Qz1 + 0.2 * values.Qz2)
      )

    case "ad1":
    case "appdev-1":
      return (
        0.05 * values.GLA +
        Math.max(
          0.6 * values.F + 0.25 * Math.max(values.Qz1, values.Qz2),
          0.4 * values.F + 0.25 * values.Qz1 + 0.3 * values.Qz2,
        )
      )

    case "java":
      return (
        0.05 * values.GAA +
        0.45 * values.F +
        0.2 * Math.max(values.PE1, values.PE2) +
        0.1 * Math.min(values.PE1, values.PE2) +
        Math.max(0.2 * Math.max(values.Qz1, values.Qz2), 0.1 * values.Qz1 + 0.2 * values.Qz2)
      )

    case "sys":
    case "sc":
      return 0.05 * values.GAA + 0.25 * values.Qz1 + 0.3 * values.OPPE + 0.3 * values.F + 0.1 * values.BPTA

    case "ad2":
    case "appdev-2":
      return (
        0.05 * values.GAA +
        Math.max(
          0.6 * values.F + 0.25 * Math.max(values.Qz1, values.Qz2),
          0.4 * values.F + 0.25 * values.Qz1 + 0.3 * values.Qz2,
        )
      )

    // Degree Level
    case "st":
      return 0.1 * values.GAA + 0.4 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2

    case "se":
      return (
        0.05 * values.GAA +
        0.2 * values.Qz2 +
        0.4 * values.F +
        0.1 * values.GP1 +
        0.1 * values.GP2 +
        0.1 * values.PP +
        0.05 * values.CP
      )

    case "dl":
      return 0.05 * values.GAA + 0.25 * values.Qz1 + 0.25 * values.Qz2 + 0.45 * values.F

    case "ai-search":
      return 0.1 * values.GAA + 0.4 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2 + (values.Bonus || 0)

    case "llm":
      return 0.05 * values.GAA + 0.35 * values.F + 0.3 * values.Qz1 + 0.3 * values.Qz2 + (values.Bonus || 0)

    // Added missing Degree Level courses
    case "spg":
      return 0.15 * values.GAA + 0.25 * values.GP + 0.25 * values.Qz2 + 0.35 * values.F

    case "ibd":
      return 0.1 * values.GAA + 0.3 * values.F + 0.2 * values.OPPE1 + 0.4 * values.OPPE2 + (values.Bonus || 0)

    case "dlcv":
      return 0.1 * values.GAA + 0.4 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2

    case "dv":
      return (
        0.3 * values.GA +
        Math.max(0.2 * values.Qz1 + 0.2 * values.Qz2, 0.3 * Math.max(values.Qz1, values.Qz2)) +
        0.3 * values.P
      )

    case "me":
      return (
        0.1 * values.GAA +
        Math.max(
          0.2 * values.Qz1 + 0.2 * values.Qz2 + 0.45 * values.F,
          0.5 * values.F + 0.25 * Math.max(values.Qz1, values.Qz2),
        )
      )

    case "atb":
      return 0.075 * values.GAA + 0.025 * values.GRPa + 0.25 * values.Qz1 + 0.25 * values.Qz2 + 0.4 * values.F

    case "i4":
      return 0.15 * getValue(values, "Quizzes") + 0.05 * getValue(values, "Game") + 0.40 * getValue(values, "Best2Assignments") + 0.30 * getValue(values, "ET") + 0.10 * getValue(values, "Project")

    case "mt":
      return (
        0.1 * values.GAA +
        Math.max(
          0.6 * values.F + 0.2 * Math.max(values.Qz1, values.Qz2),
          0.4 * values.F + 0.2 * values.Qz1 + 0.3 * values.Qz2,
        )
      )

    case "lsm":
      return (
        0.1 * values.GAA +
        0.5 * values.F +
        Math.max(0.2 * values.Qz1 + 0.2 * values.Qz2, 0.3 * Math.max(values.Qz1, values.Qz2))
      )

    case "cprog":
      return 0.10 * values.GAA + 0.20 * values.Qz1 + 0.20 * values.OPPE1 + 0.20 * values.OPPE2 + 0.30 * values.F

    case "ff":
      return (
        0.1 * values.GAA +
        Math.max(
          0.25 * values.Qz1 + 0.3 * values.GP1 + 0.35 * values.F,
          0.5 * values.F + 0.3 * Math.max(values.Qz1, values.GP1),
        )
      )

    case "nlp":
      return 0.1 * values.GAA + 0.5 * values.F + 0.2 * values.Qz1 + 0.2 * values.Qz2

    case "cf":
      return 0.1 * values.GAA + 0.4 * values.F + 0.2 * values.Qz1 + 0.3 * values.Qz2

    case "dlp":
      return (
        0.05 * values.GAA +
        0.15 * values.Quiz1 +
        0.15 * values.Quiz2 +
        0.15 * values.Quiz3 +
        0.25 * ((values.NPPE1 + values.NPPE2 + values.NPPE3) / 3) +
        0.25 * values.Viva
      )

    case "os":
      return 0.1 * values.GAA + 0.4 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2

    case "stml":
      return (
        0.05 * values.GAA +
        0.4 * values.GPA +
        Math.max(0.15 * values.Qz1 + 0.15 * values.Qz2, 0.2 * Math.max(values.Qz1, values.Qz2)) +
        0.25 * values.F
      )

    case "bdbn":
      return 0.1 * values.GAA + 0.4 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2

    // New Degree Level courses
    case "dsailab":
      return 0.05 * values.GAA + 0.25 * values.Quiz + 0.4 * values.P + 0.3 * values.V + (values.Bonus || 0)

    case "adlab":
      return 0.2 * values.Quiz2 + 0.3 * values.WA + 0.5 * values.PV

    case "cn":
      return 0.1 * values.GAA + 0.30 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2 + 0.1 * values.PA

    case "mr":
      return 0.1 * values.GAA + 0.2 * values.Qz1 + 0.2 * values.Qz2 + 0.25 * values.F + 0.25 * values.P

    case "sc":
      return 0.1 * values.GAA + 0.4 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2

    case "aa":
      return 0.1 * values.GAA + 0.35 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2

    case "spt":
      return 0.16 * values.GAA + 0.15 * values.V + 0.3 * values.F + 0.20 * values.Qz1 + 0.20 * values.Qz2

    case "mlops":
      return 0.2 * values.GAA + 0.3 * values.F + 0.25 * values.OPPE1 + 0.25 * values.OPPE2 + (values.Bonus || 0)

    case "mfgai":
      return 0.05 * values.GAA + 0.35 * values.F + 0.2 * values.Qz1 + 0.2 * values.Qz2 + 0.2 * values.NPPE

    case "toc":
      return 0.1 * values.GAA + 0.4 * values.F + 0.25 * values.Qz1 + 0.25 * values.Qz2

    // Foundation Level - Electronic Systems
    case "eng1-es":
    case "math-elec1":
    case "estc":
    case "eng2-es":
    case "digital-systems":
    case "elec-circuits":
      return (
        0.1 * values.GAA +
        Math.max(
          0.6 * values.F + 0.2 * Math.max(values.Qz1, values.Qz2),
          0.4 * values.F + 0.2 * values.Qz1 + 0.3 * values.Qz2,
        )
      )

    case "estc-lab":
    case "sensors-lab":
      return getValue(values, "Attendance") * (0.5 * getValue(values, "experiment") + 0.5 * getValue(values, "Report"))

    case "c-prog":
      return (
        0.1 * values.GAA +
        0.2 * values.Qz1 +
        0.4 * values.F +
        Math.max(0.15 * values.OPPE1 + 0.15 * values.OPPE2, 0.2 * Math.max(values.OPPE1, values.OPPE2))
      )

    case "c-prog-lab":
      return 0.5 * getValue(values, "TLA") + 0.5 * getValue(values, "IL")

    case "linux-prog":
      return (
        0.1 * values.GAA +
        0.05 * values.NPPE +
        0.2 * values.Qz1 +
        0.25 * values.OPPE +
        0.3 * values.F +
        0.05 * values.BPTA +
        0.05 * values.VMT
      )

    case "linux-shell-lab":
      return 0.5 * getValue(values, "OL") + 0.5 * getValue(values, "IL")

    case "electronics-lab":
    case "analog-lab":
      return 0.4 * getValue(values, "WE") + 0.6 * getValue(values, "ID")

    case "embedded-c":
    case "digital-system-design":
      return (
        0.1 * values.GAA +
        0.1 * values.GRPA +
        Math.max(
          0.5 * values.F + 0.2 * Math.max(values.Qz1, values.Qz2),
          0.4 * values.F + 0.2 * values.Qz1 + 0.2 * values.Qz2,
        )
      )

    case "embedded-c-lab":
    case "digital-system-lab":
      return 0.2 * getValue(values, "Attendance") + 0.8 * getValue(values, "LabExperiment")

    // Diploma Level - Electronic Systems
    case "math-elec2":
    case "analog-systems":
    case "sensors":
      return (
        0.1 * values.GAA +
        Math.max(
          0.6 * values.F + 0.2 * Math.max(values.Qz1, values.Qz2),
          0.4 * values.F + 0.2 * values.Qz1 + 0.3 * values.Qz2,
        )
      )

    case "signals-systems":
      return (
        0.1 * values.GAA +
        Math.max(
          0.5 * values.F + 0.2 * Math.max(values.Qz1, values.Qz2),
          0.4 * values.F + 0.2 * values.Qz1 + 0.2 * values.Qz2,
        ) +
        0.1 * values.GrPA
      )

    case "python-es":
      return (
        0.1 * values.GAA1 +
        0.1 * values.GAA2 +
        0.1 * values.Qz1 +
        0.4 * values.F +
        0.25 * Math.max(values.PE1, values.PE2) +
        0.15 * Math.min(values.PE1, values.PE2)
      )

    case "dsp":
      return (
        0.1 * values.GAA +
        0.1 * values.LE +
        0.05 * values.LV +
        Math.max(
          0.55 * values.F + 0.1 * Math.max(values.Qz1, values.Qz2),
          0.45 * values.F + 0.15 * values.Qz1 + 0.15 * values.Qz2,
        )
      )

    case "control-eng":
      return 0.1 * values.GAA + 0.5 * values.F + 0.2 * values.Qz1 + 0.2 * values.Qz2

    default:
      // For any course ID not explicitly handled, try to use the formula from courseData
      const course = courseData.find((c) => c.id === courseId)
      if (course) {
        // This is a simplified fallback that assumes a standard formula
        // It won't work for all courses but provides some resilience
        return (values.GAA || 0) * 0.1 + (values.F || 0) * 0.5 + (values.Qz1 || 0) * 0.2 + (values.Qz2 || 0) * 0.2
      }
      throw new Error(`Unknown course ID: ${courseId}`)
  }
}

// Import courseData to use as fallback
import { courseData } from "./course-data"
