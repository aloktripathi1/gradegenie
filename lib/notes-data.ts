export interface CourseNotes {
  courseId: string
  notesLinks: {
    title: string
    url: string
    contributor?: string
  }[]
}

export const notesData: CourseNotes[] = [
  {
    courseId: "sys", // System Commands
    notesLinks: [
      {
        title: "System Commands Notes",
        url: "https://drive.google.com/drive/folders/1Yz5QT7WvrGTdYdGCcCiSM0M2DP9_6lh1",
        contributor: "Kashiful Haque"
      }
    ]
  }
  // Add more course notes here
]
