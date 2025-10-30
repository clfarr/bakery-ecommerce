'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'
import { Product } from '@/types'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, login, logout } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
    }
  }, [isAuthenticated])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      setError('')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
              <p className="text-gray-600">Sweet Delights Bakery</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-primary-600 hover:text-primary-700">
                ← Back to Home
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded text-sm text-gray-600">
              <strong>Demo credentials:</strong><br />
              Password: <code className="bg-gray-200 px-2 py-1 rounded">bakery123</code>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary-600"
            >
              View Site
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/admin/products"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-600"
          >
            <h3 className="text-2xl font-bold mb-2">🛍️ Product Management</h3>
            <p className="text-gray-600">
              Manage your bakery products, update images, prices, and descriptions.
            </p>
          </Link>

          <Link
            href="/admin/gallery"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-600"
          >
            <h3 className="text-2xl font-bold mb-2">🖼️ Gallery Management</h3>
            <p className="text-gray-600">
              Upload and manage gallery images showcasing your bakery creations.
            </p>
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Recent Products</h2>
          <p className="text-gray-600">
            Quick view of your products. Click a product to edit.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <ProductImage product={product} size="medium" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <p className="text-2xl font-bold text-primary-600 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="flex-1 bg-primary-600 text-white text-center px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Edit Product
                  </Link>
                  <Link
                    href={`/products/${product.id}`}
                    target="_blank"
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
