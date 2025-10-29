import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const products = await prisma.product.findMany({
      where: category && category !== 'all' ? { category } : undefined,
      orderBy: { createdAt: 'asc' },
    })

    // Parse JSON fields
    const productsWithParsedFields = products.map((product) => ({
      ...product,
      flavors: product.flavors ? JSON.parse(product.flavors) : undefined,
      sizes: product.sizes ? JSON.parse(product.sizes) : undefined,
    }))

    return NextResponse.json(productsWithParsedFields)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
