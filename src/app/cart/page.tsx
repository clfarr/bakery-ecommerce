'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ProductImage from '@/components/ProductImage'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some delicious treats to your cart to get started!
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${index}`}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-32">
                    <ProductImage product={item.product} size="small" className="rounded-lg" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {item.product.name}
                        </h3>
                        {item.selectedFlavor && (
                          <p className="text-sm text-gray-600">
                            Flavor: {item.selectedFlavor}
                          </p>
                        )}
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600">
                            Size: {item.selectedSize}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded font-semibold"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded font-semibold"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-xl font-bold text-primary-600">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({itemCount})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ${(total * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="block w-full text-center text-primary-600 hover:text-primary-700 font-semibold py-3"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> All orders require 48 hours advance notice.
                  We&apos;ll contact you to confirm your order details and pickup/delivery time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
