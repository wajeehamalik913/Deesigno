"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Package, Mail, Settings } from "lucide-react"

export function Navigation() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Deesigno
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-slate-900 font-medium transition-colors"
            >
              <Home size={16} />
              Home
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 text-gray-700 hover:text-slate-900 font-medium transition-colors"
            >
              <Package size={16} />
              Products
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-gray-700 hover:text-slate-900 font-medium transition-colors"
            >
              <Mail size={16} />
              Contact
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2 text-gray-700 hover:text-slate-900 font-medium transition-colors"
            >
              <Settings size={16} />
              Admin
            </Link>
          </nav>
          <Link href="/contact">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">Get Quote</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
