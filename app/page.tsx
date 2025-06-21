import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, User } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { ProductGrid } from "@/components/product-grid"
import { ProductShowcaseImage } from "@/components/product-showcase-image"
import { shopifyFetch, getProductsQuery } from "@/lib/shopify"
import type { ShopifyProduct } from "@/lib/types"

async function getFeaturedProducts() {
  try {
    const { body } = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({
      query: getProductsQuery,
      variables: { first: 8 },
      cache: "force-cache",
    })

    return body.products.edges.map((edge) => edge.node)
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  // Sample products for when Shopify products aren't available
  const sampleProducts = [
    {
      id: "sample-1",
      title: "Custom T-Shirts",
      handle: "custom-t-shirts",
      featuredImage: { url: "/placeholder.svg?height=200&width=200", altText: "Custom T-Shirt" },
      priceRange: { minVariantPrice: { amount: "19.99" } },
    },
    {
      id: "sample-2",
      title: "Custom Hoodies",
      handle: "custom-hoodies",
      featuredImage: { url: "/placeholder.svg?height=200&width=200", altText: "Custom Hoodie" },
      priceRange: { minVariantPrice: { amount: "39.99" } },
    },
    {
      id: "sample-3",
      title: "Water Bottles",
      handle: "water-bottles",
      featuredImage: { url: "/placeholder.svg?height=200&width=200", altText: "Water Bottle" },
      priceRange: { minVariantPrice: { amount: "24.99" } },
    },
    {
      id: "sample-4",
      title: "Custom Mugs",
      handle: "custom-mugs",
      featuredImage: { url: "/placeholder.svg?height=200&width=200", altText: "Custom Mug" },
      priceRange: { minVariantPrice: { amount: "14.99" } },
    },
  ]

  // Use sample products if no real products are available
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : sampleProducts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">Deesigno</span> - Custom merchandise made easy. Free shipping on orders over $50!
        <Link href="/products" className="text-orange-400 hover:text-orange-300 ml-2 font-semibold">
          Order now
        </Link>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-slate-900">
                Deesigno
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-slate-900 font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-slate-900 font-medium">
                Products
              </Link>
              <Link href="/custom-design" className="text-gray-700 hover:text-slate-900 font-medium">
                Custom Design
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-slate-900 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-slate-900 font-medium">
                Contact
              </Link>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <User className="h-4 w-4" />
              </Button>
              <CartDrawer />
              <Link href="/custom-design">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6">Start Designing</Button>
              </Link>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

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
              <Link href="/custom-design">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-3"
                >
                  Start Custom Order
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {displayProducts.length > 0 ? (
                displayProducts.slice(0, 4).map((product, index) => {
                  const rotations = [-2, 2, 1, -1]
                  return (
                    <ProductShowcaseImage
                      key={product.id}
                      src={product.featuredImage?.url || "/placeholder.svg?height=200&width=200"}
                      alt={product.featuredImage?.altText || product.title}
                      title={product.title}
                      price={`From $${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`}
                      className={`bg-white rounded-lg shadow-lg p-4 transform rotate-[${rotations[index]}deg] ${index === 1 || index === 3 ? "mt-8" : ""}`}
                    />
                  )
                })
              ) : (
                // Fallback when no products are found
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-lg p-4">
                      <div className="w-full h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                      <h3 className="font-semibold text-sm">Sample Product {i}</h3>
                      <p className="text-xs text-gray-500">From $19.99</p>
                    </div>
                  ))}
                </>
              )}
            </div>

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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular custom merchandise options, perfect for your brand.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-4">Connect your Shopify store to display your products here.</p>
                <div className="text-sm text-gray-400">
                  <p>1. Add products to your Shopify store</p>
                  <p>2. Verify your environment variables</p>
                  <p>3. Check your Shopify API connection</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                View All Products
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

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to bring your ideas to life?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start creating custom merchandise that represents your brand perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/custom-design">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                Start Your Design
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <Link href="/products/t-shirts" className="hover:text-slate-900">
                    T-Shirts
                  </Link>
                </li>
                <li>
                  <Link href="/products/hoodies" className="hover:text-slate-900">
                    Hoodies
                  </Link>
                </li>
                <li>
                  <Link href="/products/bottles" className="hover:text-slate-900">
                    Water Bottles
                  </Link>
                </li>
                <li>
                  <Link href="/products/mugs" className="hover:text-slate-900">
                    Mugs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/custom-design" className="hover:text-slate-900">
                    Custom Design
                  </Link>
                </li>
                <li>
                  <Link href="/bulk-orders" className="hover:text-slate-900">
                    Bulk Orders
                  </Link>
                </li>
                <li>
                  <Link href="/rush-orders" className="hover:text-slate-900">
                    Rush Orders
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/contact" className="hover:text-slate-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="hover:text-slate-900">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-slate-900">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-slate-900">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Deesigno. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
