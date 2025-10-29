'use client'

import { useState } from 'react'
import Image from 'next/image'

// Sample gallery data with real images
const galleryItems = [
  { id: 1, category: 'cakes', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', emoji: '🎂', name: 'Classic Wedding Cake', description: '3-tier vanilla with buttercream' },
  { id: 2, category: 'cakes', emoji: '🍫', name: 'Chocolate Dream', description: 'Rich chocolate with ganache' },
  { id: 3, category: 'cakes', emoji: '🎉', name: 'Birthday Celebration', description: 'Colorful funfetti design' },
  { id: 4, category: 'cupcakes', emoji: '🧁', name: 'Vanilla Cupcakes', description: 'Classic vanilla with swirl frosting' },
  { id: 5, category: 'cupcakes', emoji: '🍓', name: 'Strawberry Cupcakes', description: 'Fresh strawberry flavor' },
  { id: 6, category: 'cupcakes', emoji: '🍫', name: 'Chocolate Cupcakes', description: 'Double chocolate delight' },
  { id: 7, category: 'cake-pops', emoji: '🍭', name: 'Rainbow Cake Pops', description: 'Colorful and fun' },
  { id: 8, category: 'cake-pops', emoji: '💍', name: 'Wedding Cake Pops', description: 'Elegant white chocolate' },
  { id: 9, category: 'cake-pops', emoji: '🎨', name: 'Custom Themed Pops', description: 'Personalized designs' },
  { id: 10, category: 'cakes', emoji: '❤️', name: 'Red Velvet Romance', description: 'Classic red velvet with cream cheese' },
  { id: 11, category: 'cakes', emoji: '🌸', name: 'Floral Fantasy', description: 'Decorated with edible flowers' },
  { id: 12, category: 'cupcakes', emoji: '✨', name: 'Specialty Cupcakes', description: 'Gourmet flavors' },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null)

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  const categories = [
    { id: 'all', name: 'All', emoji: '🎂' },
    { id: 'cakes', name: 'Cakes', emoji: '🎂' },
    { id: 'cupcakes', name: 'Cupcakes', emoji: '🧁' },
    { id: 'cake-pops', name: 'Cake Pops', emoji: '🍭' },
  ]

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Our Gallery</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Browse through our delicious creations! Each item is freshly made with premium ingredients and lots of love.
        </p>

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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-8xl">{item.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-96 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-[200px]">{selectedItem.emoji}</span>
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-2">{selectedItem.name}</h2>
                <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
