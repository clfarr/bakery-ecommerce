import Link from 'next/link'

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-8xl mb-6">✅</div>
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your order! We&apos;ve received your request and will contact you shortly to confirm the details.
        </p>

        <div className="bg-primary-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold text-lg mb-3">What&apos;s Next?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ You&apos;ll receive a confirmation email shortly</li>
            <li>✓ We&apos;ll call you within 24 hours to confirm your order details</li>
            <li>✓ All orders require 48 hours notice for preparation</li>
            <li>✓ We&apos;ll coordinate pickup or delivery time with you</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/products"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold mr-4"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold border-2 border-primary-600"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-gray-600">
            Have questions? <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
