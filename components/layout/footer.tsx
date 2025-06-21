import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Deesigno</h3>
            <p className="text-gray-600 text-sm">Your trusted partner for custom merchandise and branded products.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/products?category=apparel" className="hover:text-slate-900">
                  Custom T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=apparel" className="hover:text-slate-900">
                  Custom Hoodies
                </Link>
              </li>
              <li>
                <Link href="/products?category=drinkware" className="hover:text-slate-900">
                  Water Bottles
                </Link>
              </li>
              <li>
                <Link href="/products?category=drinkware" className="hover:text-slate-900">
                  Custom Mugs
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-slate-900">
                  Caps & Hats
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-slate-900">
                  Tote Bags
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
                <Link href="/gallery" className="hover:text-slate-900">
                  Gallery
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
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: hello@deesigno.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Mon-Fri: 9AM-6PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Deesigno. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
