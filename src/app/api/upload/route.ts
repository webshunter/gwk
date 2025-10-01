import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

// POST - Upload image to Sanity
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Determine file type (image or video)
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Only image and video files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size
    const maxSize = isImage ? 10 * 1024 * 1024 : 100 * 1024 * 1024 // 10MB for images, 100MB for videos
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size too large. Maximum ${isImage ? '10MB' : '100MB'} allowed` },
        { status: 400 }
      )
    }

    // Upload file to Sanity
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const assetType = isImage ? 'image' : 'file'
    const asset = await writeClient.assets.upload(assetType, buffer, {
      filename: file.name,
    })

    return NextResponse.json({
      success: true,
      asset: {
        _id: asset._id,
        url: asset.url
      }
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}