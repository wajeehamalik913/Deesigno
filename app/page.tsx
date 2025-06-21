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
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
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
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">Deesigno</span> - Custom merchandise made easy. Free shipping on orders over $50!
        <Link href="/contact" className="text-orange-400 hover:text-orange-300 ml-2 font-semibold">
          Get Quote
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Explore Deesigno's impact on
                <br />
                <span className="underline decoration-orange-400 decoration-4">your Brand</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Elevate your brand with Deesigno, a dependable solution you can count on. We offer swift and dedicated
                custom printing services, freeing you to prioritize what's important. Leave the rest to us.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3">
                  View Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-3"
                >
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {featuredProducts.map((product, index) => {
                  const rotations = [-2, 2, 1, -1]
                  return (
                    <ProductShowcaseImage
                      key={product.id}
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText}
                      title={product.title}
                      price={`From $${product.price.toFixed(2)}`}
                      className={`bg-white rounded-lg shadow-lg p-4 transform rotate-[${rotations[index]}deg] ${index === 1 || index === 3 ? "mt-8" : ""}`}
                    />
                  )
                })}
              </div>
            )}

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold transform rotate-12">
              New!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-slate-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Free Design
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our range of custom merchandise options, perfect for your brand.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={product.featuredImage.url || "/placeholder.svg"}
                      alt={product.featuredImage.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-900">From ${product.price.toFixed(2)}</span>
                      <Link href="/contact">
                        <Button size="sm">Get Quote</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
                Request Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Deesigno?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make custom merchandise simple, affordable, and high-quality for businesses and individuals alike.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
              <p className="text-gray-600">
                Upload your design or work with our team to create something unique for your brand.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">
                Quick production times without compromising on quality. Most orders ship within 3-5 business days.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                High-quality materials and printing techniques ensure your custom merchandise looks professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to bring your ideas to life?</h2>
          <p className="text-xl text-gray-300 mb-8">Contact us today for a custom quote on your merchandise needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                <Mail className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
            <Link href="tel:+15551234567">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
