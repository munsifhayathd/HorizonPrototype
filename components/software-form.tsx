'use client'

import { useState } from 'react'
import { validateInput } from '@/middleware/validation'

export function SoftwareForm() {
  const [softwareDetails, setSoftwareDetails] = useState('')
  const [email, setEmail] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateInput({ softwareDetails, email, files })
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)

    const formData = new FormData()
    formData.append('softwareDetails', softwareDetails)
    formData.append('email', email)
    files.forEach((file) => formData.append('files', file))

    setLoading(true)
    try {
      const res = await fetch('/api/process-software', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to submit')
      } else {
        setResponse(data)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Software Details</label>
        <textarea
          value={softwareDetails}
          onChange={(e) => setSoftwareDetails(e.target.value)}
          className="w-full border rounded-md p-2"
          rows={4}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Files</label>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="w-full"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {response && response.instructions && (
        <pre className="mt-4 p-2 bg-gray-100 rounded-md overflow-x-auto">
          {JSON.stringify(response.instructions, null, 2)}
        </pre>
      )}
    </form>
  )
}
