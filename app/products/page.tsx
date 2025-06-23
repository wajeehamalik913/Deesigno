"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductShowcaseImage } from "@/components/product-showcase-image"
import { OrderForm } from "@/components/order-form"
import { getProducts, getProductsByCategory, type Product } from "@/lib/products"

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        let fetchedProducts: Product[]

        if (selectedCategory) {
          fetchedProducts = getProductsByCategory(selectedCategory)
        } else {
          fetchedProducts = getProducts()
        }

        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const categories = [
    { value: "", label: "All Products" },
    { value: "apparel", label: "Apparel" },
    { value: "accessories", label: "Accessories" },
    { value: "drinkware", label: "Drinkware" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">Our Collection</h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Discover our curated selection of premium clothing and accessories. Each piece can be customized to match
            your unique style.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.value)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ProductShowcaseImage
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText}
                      title=""
                      price=""
                      className="w-full"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-slate-900">
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-slate-900">AED {product.price.toFixed(2)}</span>
                    </div>

                    {/* Variants */}
                    {product.variants && (
                      <div className="mb-4 space-y-2">
                        {product.variants.size && (
                          <div>
                            <span className="text-xs font-medium text-gray-700">Sizes: </span>
                            <span className="text-xs text-gray-600">{product.variants.size.join(", ")}</span>
                          </div>
                        )}
                        {product.variants.color && (
                          <div>
                            <span className="text-xs font-medium text-gray-700">Colors: </span>
                            <span className="text-xs text-gray-600">{product.variants.color.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <OrderForm product={product} type="order" />
                      <OrderForm product={product} type="customize" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
