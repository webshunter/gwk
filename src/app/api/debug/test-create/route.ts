import { NextRequest, NextResponse } from 'next/server'
import { createPage } from '@/app/admin/actions'

export async function POST(request: NextRequest) {
  try {
    const { title, slug } = await request.json()
    
    console.log("Test create page with auth:", { title, slug })
    
    const result = await createPage({ 
      title: title || `Test Page ${Date.now()}`, 
      slug: slug || `test-page-${Date.now()}`
    })
    
    console.log("Test create page result:", result)
    
    return NextResponse.json({ 
      success: true, 
      result,
      message: "Page created successfully with auth"
    })
  } catch (error) {
    console.error("Test create page with auth error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}