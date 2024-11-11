interface ValidationInput {
  softwareDetails: string
  email: string
  files: File[]
}

export function validateInput({ softwareDetails, email, files }: ValidationInput): string | null {
  if (!softwareDetails?.trim()) {
    return 'Software details are required'
  }

  if (!email?.trim()) {
    return 'Email is required'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Invalid email format'
  }

  const maxFileSize = 10 * 1024 * 1024 // 10MB
  for (const file of files) {
    if (file.size > maxFileSize) {
      return 'File size exceeds 10MB limit'
    }
  }

  return null
} 