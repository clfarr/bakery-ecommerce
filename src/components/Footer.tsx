import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🎂</span>
              <span className="text-lg font-bold">Sweet Delights</span>
            </div>
            <p className="text-gray-400 text-sm">
              Freshly baked cakes, cupcakes, and cake pops made with love for your special moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=cakes" className="text-gray-400 hover:text-white transition-colors">
                  Custom Cakes
                </Link>
              </li>
              <li>
                <Link href="/products?category=cupcakes" className="text-gray-400 hover:text-white transition-colors">
                  Cupcakes
                </Link>
              </li>
              <li>
                <Link href="/products?category=cake-pops" className="text-gray-400 hover:text-white transition-colors">
                  Cake Pops
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 123 Baker Street, Sweet City, SC 12345</li>
              <li>📞 (555) 123-4567</li>
              <li>📧 hello@sweetdelights.com</li>
              <li className="pt-2">
                <div className="text-sm">
                  <strong className="text-white">Hours:</strong>
                  <p>Mon-Fri: 8am - 6pm</p>
                  <p>Sat: 9am - 5pm</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
