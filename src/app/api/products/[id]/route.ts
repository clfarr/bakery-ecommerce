import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Parse JSON fields
    const productWithParsedFields = {
      ...product,
      flavors: product.flavors ? JSON.parse(product.flavors) : undefined,
      sizes: product.sizes ? JSON.parse(product.sizes) : undefined,
    }

    return NextResponse.json(productWithParsedFields)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    // Convert arrays to JSON strings for storage
    const updateData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image || null,
      emoji: data.emoji,
      flavors: data.flavors ? JSON.stringify(data.flavors) : null,
      sizes: data.sizes ? JSON.stringify(data.sizes) : null,
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    })

    // Parse JSON fields for response
    const productWithParsedFields = {
      ...product,
      flavors: product.flavors ? JSON.parse(product.flavors) : undefined,
      sizes: product.sizes ? JSON.parse(product.sizes) : undefined,
    }

    return NextResponse.json(productWithParsedFields)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
