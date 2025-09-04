export interface FormField {
  id: string
  label: string
  description: string
  max: number
}

export interface Course {
  id: string
  name: string
  degree: string
  level: string
  formula: string
  formFields: FormField[]
}
