"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img src="/logob.png" alt="Deesigno Logo" className="h-8 sm:h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors text-sm xl:text-base ${
                  pathname === item.href
                    ? "text-slate-900 border-b-2 border-slate-900"
                    : "text-gray-700 hover:text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* <Link
              href="/admin"
              className={`font-medium transition-colors text-sm xl:text-base ${
                pathname === "/admin"
                  ? "text-slate-900 border-b-2 border-slate-900"
                  : "text-gray-700 hover:text-slate-900"
              }`}
            >
              Admin
            </Link> */}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/contact" className="hidden sm:block">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white text-sm px-4 py-2">Get Quote</Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors px-2 py-1 ${
                    pathname === item.href ? "text-slate-900 bg-gray-100 rounded" : "text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin"
                className={`font-medium transition-colors px-2 py-1 ${
                  pathname === "/admin" ? "text-slate-900 bg-gray-100 rounded" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <div className="pt-2 border-t border-gray-200">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white w-full">Get Quote</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
