import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import ProductImage from '@/components/ProductImage'

export default async function Home() {
  const products = await getProducts()
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary-100 to-primary-200">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Sweet Delights Bakery
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Freshly baked cakes, cupcakes, and cake pops made with love for your special moments
            </p>
            <div className="flex gap-4">
              <Link
                href="/products"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Order Now
              </Link>
              <Link
                href="/about"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold border-2 border-primary-600"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <ProductImage product={product} size="medium" className="rounded-t-lg" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-2xl font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/products?category=cakes" className="group">
              <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">🎂</div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  Custom Cakes
                </h3>
                <p className="text-gray-600">
                  Beautiful custom cakes for birthdays, weddings, and celebrations
                </p>
              </div>
            </Link>
            <Link href="/products?category=cupcakes" className="group">
              <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">🧁</div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  Cupcakes
                </h3>
                <p className="text-gray-600">
                  Delicious cupcakes in various flavors, perfect for any occasion
                </p>
              </div>
            </Link>
            <Link href="/products?category=cake-pops" className="group">
              <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">🍭</div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  Cake Pops
                </h3>
                <p className="text-gray-600">
                  Bite-sized treats on a stick, perfect for parties and gifts
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
