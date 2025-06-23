import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Deesigno</h3>
            <p className="text-gray-600 text-sm">Where fashion meets creativity. Your style, amplified.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/products?category=apparel" className="hover:text-slate-900">
                  T-Shirts & Tops
                </Link>
              </li>
              <li>
                <Link href="/products?category=apparel" className="hover:text-slate-900">
                  Hoodies & Sweatshirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=apparel" className="hover:text-slate-900">
                  Bottoms
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-slate-900">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-slate-900">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/contact" className="hover:text-slate-900">
                  Custom Printing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900">
                  Brand Merchandise
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-slate-900">
                  Design Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-slate-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li className="pt-2">
                <p className="text-xs">Email: hello@deesigno.com</p>
                <p className="text-xs">Phone: (555) 123-4567</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Deesigno. All rights reserved. Express yourself.</p>
        </div>
      </div>
    </footer>
  )
}
