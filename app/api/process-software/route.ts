import { NextResponse } from 'next/server'
import { generateInstructions } from '@/lib/openai'
import { validateInput } from '@/middleware/validation'
import { handleFileUpload } from '@/utils/file-handler'
import { sendEmailNotification } from '@/utils/email-service'
import { generatePrototypeInstructions } from '@/services/instruction-generator'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    
    console.log('Received form data:', {
      softwareDetails: formData.get('softwareDetails'),
      email: formData.get('email'),
      filesCount: formData.getAll('files').length
    })

    const softwareDetails = formData.get('softwareDetails')
    const email = formData.get('email')
    const files = formData.getAll('files')

    if (!softwareDetails || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate instructions using OpenAI
    const aiResponse = await generateInstructions(softwareDetails.toString(), [])

    // Process and structure the instructions
    const structuredInstructions = await generatePrototypeInstructions(aiResponse)

    console.log('Structured instructions:', structuredInstructions)

    // For now, skip email notification to isolate the issue
    // await sendEmailNotification(email.toString(), structuredInstructions)

    return NextResponse.json({
      success: true,
      instructions: structuredInstructions
    })

  } catch (error) {
    console.error('Error processing software details:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process request',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 