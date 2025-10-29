import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-gray-600">
            Baking happiness, one treat at a time since 2015
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-md">
            <div className="text-center mb-8">
              <span className="text-8xl">🎂</span>
            </div>
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-700 mb-6">
                Sweet Delights Bakery was born from a simple passion: bringing joy to people&apos;s lives through
                the art of baking. What started in a small home kitchen has grown into a beloved community bakery,
                serving custom cakes, cupcakes, and cake pops for all of life&apos;s special moments.
              </p>
              <p className="text-gray-700 mb-6">
                Our founder, Sarah Martinez, discovered her love for baking at age 12 when she made her first
                birthday cake for her mother. That spark ignited a lifelong passion that eventually led to
                culinary school and years of experience in premier bakeries across the country.
              </p>
              <p className="text-gray-700">
                Today, Sweet Delights is proud to serve our community with handcrafted treats made from scratch
                using only the finest ingredients. Every cake, cupcake, and cake pop is made fresh to order
                with love, care, and attention to detail.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-md">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We use only premium ingredients and never compromise on quality.
                Every treat is made fresh to order.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-md">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-3">Made with Love</h3>
              <p className="text-gray-600">
                Each creation is handcrafted with care and attention to detail,
                ensuring your special moment is truly memorable.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-md">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Community Focused</h3>
              <p className="text-gray-600">
                We&apos;re proud to be part of this community and love being a part
                of your celebrations, big and small.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-md">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">🎂</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Custom Cakes</h3>
                  <p className="text-gray-600">
                    From birthdays to weddings, we create custom cakes tailored to your vision.
                    Choose from a variety of flavors, sizes, and designs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">🧁</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cupcakes</h3>
                  <p className="text-gray-600">
                    Perfect for parties, events, or just treating yourself. Available in classic
                    flavors and specialty varieties.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">🍭</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cake Pops</h3>
                  <p className="text-gray-600">
                    Bite-sized treats on a stick, perfect for party favors, gifts, or event displays.
                    Custom designs available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center bg-primary-100 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Let&apos;s create something delicious for your next celebration!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold border-2 border-primary-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
