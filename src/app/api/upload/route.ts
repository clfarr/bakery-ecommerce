import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase()
    const filename = `products/${timestamp}-${originalName}`

    // Check if Vercel Blob is available (production)
    const isProduction = process.env.BLOB_READ_WRITE_TOKEN

    if (isProduction) {
      // Upload to Vercel Blob (production)
      const blob = await put(filename, file, {
        access: 'public',
      })

      return NextResponse.json({
        success: true,
        imagePath: blob.url
      })
    } else {
      // Fallback to local filesystem (development)
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const localFilename = `${timestamp}-${originalName}`
      const path = join(process.cwd(), 'public', 'images', 'products', localFilename)
      await writeFile(path, buffer)

      const imagePath = `/images/products/${localFilename}`

      return NextResponse.json({
        success: true,
        imagePath
      })
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
