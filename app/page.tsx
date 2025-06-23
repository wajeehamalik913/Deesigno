"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { ProductShowcaseImage } from "@/components/product-showcase-image"
import type { Product } from "@/lib/products"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setProducts([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-xs sm:text-sm">
        <span className="font-medium">Deesigno</span> - Premium clothing & custom prints. Free shipping on orders over
        $75!
        <Link href="/contact" className="text-orange-400 hover:text-orange-300 ml-2 font-semibold">
          Shop Now
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                Express Your Style with
                <br className="hidden sm:block" />
                <span className="underline decoration-orange-400 decoration-2 sm:decoration-4">Deesigno</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                From trendy streetwear to custom designs, we&apos;ve got your style covered. Shop our latest collections
                or create something uniquely yours with our custom printing services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 py-3 w-full sm:w-auto"
                >
                  Shop Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-6 sm:px-8 py-3 w-full sm:w-auto"
                >
                  Custom Design
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative mt-8 lg:mt-0">
            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-lg p-3 sm:p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded mb-3 sm:mb-4"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 sm:h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {featuredProducts.map((product, index) => {
                  const rotations = ["-rotate-2", "rotate-2", "rotate-1", "-rotate-1"]
                  const marginClasses = index === 1 || index === 3 ? "mt-4 sm:mt-8" : ""
                  return (
                    <ProductShowcaseImage
                      key={product.id}
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText}
                      title={product.title}
                      price={`$${product.price.toFixed(2)}`}
                      className={`bg-white rounded-lg shadow-lg p-3 sm:p-4 transform ${rotations[index]} ${marginClasses}`}
                    />
                  )
                })}
              </div>
            )}

            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-orange-400 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transform rotate-12">
              New Drop!
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-slate-900 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              Custom Available
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Featured Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Discover our latest designs and bestsellers. From everyday essentials to statement pieces.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4 sm:p-6">
                    <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-5 sm:h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-7 sm:h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.featuredImage.url || "/placeholder.svg"}
                      alt={product.featuredImage.altText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <Link href="/products">
                          <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                            View
                          </Button>
                        </Link>
                        <Link href="/contact">
                          <Button size="sm" className="text-xs sm:text-sm">
                            Customize
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:mt-12">
            <Link href="/products">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 mr-4">
                View All Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-6 sm:px-8"
              >
                Start Custom Order
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              More than just a clothing brand - we&apos;re your complete style solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">👕</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Ready-to-Wear</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Curated collections of trendy streetwear, basics, and statement pieces for every style.
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">🎨</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Custom Printing</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Bring your designs to life on any of our products. Perfect for personal expression or gifts.
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">🏢</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Brand Merchandise</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Professional merchandise solutions for businesses, events, and organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Ready to Express Your Style?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
            Shop our collection or create something custom. Your style, your way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Shop Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Custom Order
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
