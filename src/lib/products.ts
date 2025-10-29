import { Product } from '@/types'

// Server-side: Fetch from API (runs on server in Next.js)
export async function getProducts(category?: string): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const url = category && category !== 'all'
    ? `${baseUrl}/api/products?category=${category}`
    : `${baseUrl}/api/products`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Client-side: Direct API calls
export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Failed to update product')
  return res.json()
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error('Failed to delete product')
}
