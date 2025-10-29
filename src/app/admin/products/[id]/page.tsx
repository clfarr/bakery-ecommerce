'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { Product } from '@/types'
import ProductImage from '@/components/ProductImage'
import Link from 'next/link'

export default function AdminEditProductPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAdmin()
  const productId = params.id as string

  const [formData, setFormData] = useState<Product | null>(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    } else {
      fetchProduct()
    }
  }, [isAuthenticated, router, productId])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`)
      if (res.ok) {
        const product = await res.json()
        setFormData(product)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!formData) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => prev ? { ...prev, [name]: value } : null)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    setFormData((prev) => prev ? { ...prev, price: value } : null)
  }

  const handleArrayChange = (field: 'flavors' | 'sizes', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item)
    setFormData((prev) => prev ? { ...prev, [field]: items } : null)
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => {
          setSaved(false)
          router.push('/admin')
        }, 2000)
      } else {
        alert('Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link href="/admin" className="text-primary-600 hover:text-primary-700 text-sm">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold mt-1">Edit Product</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Preview</h3>
              <ProductImage product={formData} size="large" className="rounded-lg mb-4" />
              <h4 className="text-2xl font-bold mb-2">{formData.name}</h4>
              <p className="text-gray-600 mb-3">{formData.description}</p>
              <p className="text-3xl font-bold text-primary-600">
                ${formData.price.toFixed(2)}
              </p>
              {formData.flavors && formData.flavors.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold text-sm">Flavors:</p>
                  <p className="text-sm text-gray-600">{formData.flavors.join(', ')}</p>
                </div>
              )}
              {formData.sizes && formData.sizes.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold text-sm">Sizes:</p>
                  <p className="text-sm text-gray-600">{formData.sizes.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Edit Form */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-6">Edit Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handlePriceChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Image URL
                    <span className="text-xs text-gray-500 ml-2">(Use Unsplash, local path, or leave blank for emoji)</span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image || ''}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Search <a href="https://unsplash.com" target="_blank" className="text-primary-600 hover:underline">Unsplash</a> for cake images and copy the URL
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="cakes">Cakes</option>
                    <option value="cupcakes">Cupcakes</option>
                    <option value="cake-pops">Cake Pops</option>
                  </select>
                </div>

                {formData.flavors && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Flavors
                      <span className="text-xs text-gray-500 ml-2">(comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.flavors.join(', ')}
                      onChange={(e) => handleArrayChange('flavors', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                {formData.sizes && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Sizes
                      <span className="text-xs text-gray-500 ml-2">(comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.sizes.join(', ')}
                      onChange={(e) => handleArrayChange('sizes', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={handleSave}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                  >
                    Save Changes
                  </button>
                </div>

                {saved && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    ✓ Product updated successfully! Redirecting...
                  </div>
                )}

                <div className="pt-2 text-sm text-gray-500">
                  <strong>Note:</strong> Changes are saved to the database and will persist across sessions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
