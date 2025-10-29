'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { OrderFormData } from '@/types'
import ProductImage from '@/components/ProductImage'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryMethod: 'pickup',
    address: '',
    city: '',
    zipCode: '',
    specialInstructions: '',
  })

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would send this to your backend
    console.log('Order submitted:', {
      items,
      formData,
      total: (total * 1.08).toFixed(2),
    })

    clearCart()
    router.push('/order-confirmation')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const taxAmount = total * 0.08
  const finalTotal = total + taxAmount

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Delivery Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary-500">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Store Pickup</div>
                      <div className="text-sm text-gray-600">
                        Pick up at 123 Baker Street, Sweet City
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary-500">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={formData.deliveryMethod === 'delivery'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Local Delivery</div>
                      <div className="text-sm text-gray-600">
                        Delivery within 10 miles ($15 fee)
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Delivery Address (if delivery selected) */}
              {formData.deliveryMethod === 'delivery' && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required={formData.deliveryMethod === 'delivery'}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required={formData.deliveryMethod === 'delivery'}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required={formData.deliveryMethod === 'delivery'}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Special Instructions</h2>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any special requests or custom decorations?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="flex gap-3">
                    <div className="flex-shrink-0 w-16">
                      <ProductImage product={item.product} size="small" className="rounded" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.product.name}</h4>
                      {item.selectedFlavor && (
                        <p className="text-xs text-gray-600">{item.selectedFlavor}</p>
                      )}
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {formData.deliveryMethod === 'delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>$15.00</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ${(
                      finalTotal +
                      (formData.deliveryMethod === 'delivery' ? 15 : 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
