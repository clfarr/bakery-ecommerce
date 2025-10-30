import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/gallery - Get all gallery items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category && category !== 'all' ? { category } : {}

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 })
  }
}

// POST /api/gallery - Create new gallery item
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const item = await prisma.galleryItem.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        image: data.image,
        order: data.order || 0,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 })
  }
}
