import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'cv', 'antonio-silva.pdf')
    const fileBuffer = await readFile(filePath)

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="antonio-silva.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
  catch (error) {
    console.error('Error serving resume PDF:', error)
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 },
    )
  }
}
