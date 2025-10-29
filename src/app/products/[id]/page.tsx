'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'
import ProductImage from '@/components/ProductImage'
import { Product } from '@/types'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedFlavor, setSelectedFlavor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setProduct(data)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Products
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product.flavors && !selectedFlavor) {
      alert('Please select a flavor')
      return
    }
    if (product.sizes && !selectedSize) {
      alert('Please select a size')
      return
    }

    addToCart(product, quantity, selectedFlavor, selectedSize)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="text-primary-600 hover:text-primary-700 mb-6 flex items-center gap-2"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <ProductImage product={product} size="xl" className="rounded-lg" />

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-primary-600 mb-6">
              ${product.price.toFixed(2)}
              {(product.category === 'cupcakes' || product.category === 'cake-pops') && (
                <span className="text-sm font-normal text-gray-600"> per item</span>
              )}
            </p>
            <p className="text-gray-700 mb-8">{product.description}</p>

            {/* Flavor Selection */}
            {product.flavors && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Select Flavor *
                </label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Choose a flavor...</option>
                  {product.flavors.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Select Size *
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Choose a size...</option>
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-semibold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg mb-4"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                ✓ Added to cart successfully!
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-8 border-t pt-6">
              <h3 className="font-semibold mb-3">Additional Information</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• All products are made fresh to order</li>
                <li>• Minimum 48 hours notice required for all orders</li>
                <li>• Custom decorations available upon request</li>
                <li>• Contact us for dietary restrictions and allergen information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
