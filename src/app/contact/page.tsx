'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Have a question or want to place a custom order? We&apos;d love to hear from you!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Baker Street<br />
                      Sweet City, SC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">hello@sweetdelights.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">🕐</div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8am - 6pm<br />
                      Saturday: 9am - 5pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex gap-4 text-3xl">
                  <a href="#" className="hover:scale-110 transition-transform">📘</a>
                  <a href="#" className="hover:scale-110 transition-transform">📷</a>
                  <a href="#" className="hover:scale-110 transition-transform">🐦</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
                  <div className="text-4xl mb-2">✓</div>
                  <p className="font-semibold">Message sent successfully!</p>
                  <p className="text-sm">We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
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
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a subject...</option>
                      <option value="general">General Inquiry</option>
                      <option value="custom-order">Custom Order</option>
                      <option value="wedding">Wedding Cakes</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
