import { shopifyFetch, getProductsQuery } from "@/lib/shopify"
import type { ShopifyProduct } from "@/lib/types"
import { ProductGrid } from "@/components/product-grid"

async function getAllProducts() {
  try {
    const { body } = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({
      query: getProductsQuery,
      variables: { first: 50 },
      cache: "force-cache",
    })

    return body.products.edges.map((edge) => edge.node)
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of customizable merchandise perfect for your brand.
          </p>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found. Please check your Shopify configuration.</p>
          </div>
        )}
      </div>
    </div>
  )
}
