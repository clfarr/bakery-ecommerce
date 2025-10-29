'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import ProductImage from './ProductImage'
import { Product } from '@/types'

interface ProductsListProps {
  initialCategory?: string
}

export default function ProductsList({ initialCategory = 'all' }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts(selectedCategory)
  }, [selectedCategory])

  const fetchProducts = async (category: string) => {
    setLoading(true)
    try {
      const url = category === 'all' ? '/api/products' : `/api/products?category=${category}`
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All Products', emoji: '🎂' },
    { id: 'cakes', name: 'Cakes', emoji: '🎂' },
    { id: 'cupcakes', name: 'Cupcakes', emoji: '🧁' },
    { id: 'cake-pops', name: 'Cake Pops', emoji: '🍭' },
  ]

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                  <ProductImage product={product} size="medium" className="rounded-t-lg" />
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-primary-600">
                        ${product.price.toFixed(2)}
                      </p>
                      <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                        {product.category === 'cake-pops' ? 'Cake Pops' : product.category === 'cupcakes' ? 'Cupcakes' : 'Cakes'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
