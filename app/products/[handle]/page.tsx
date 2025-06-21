import { notFound } from "next/navigation"
import Image from "next/image"
import { shopifyFetch, getProductQuery } from "@/lib/shopify"
import type { ShopifyProduct } from "@/lib/types"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductPageProps {
  params: {
    handle: string
  }
}

async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const { body } = await shopifyFetch<{ product: ShopifyProduct }>({
      query: getProductQuery,
      variables: { handle },
      cache: "force-cache",
    })

    return body.product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  const variant = product.variants.edges[0]?.node
  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white">
              <Image
                src={product.featuredImage.url || "/placeholder.svg"}
                alt={product.featuredImage.altText}
                fill
                className="object-cover"
                priority
              />
            </div>

            {product.images && product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.edges.slice(1, 5).map(({ node: image }, index) => (
                  <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-white">
                    <Image src={image.url || "/placeholder.svg"} alt={image.altText} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
              <p className="text-2xl font-semibold text-slate-900 mt-2">${price.toFixed(2)}</p>
            </div>

            <div className="prose prose-sm text-gray-600">
              <p>{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants.edges.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Options</h3>
                <div className="space-y-2">
                  {product.variants.edges.map(({ node: variant }) => (
                    <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{variant.title}</span>
                      <span className="text-sm font-medium">${Number.parseFloat(variant.price.amount).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              {variant && (
                <AddToCartButton
                  variantId={variant.id}
                  availableForSale={variant.availableForSale}
                  productTitle={product.title}
                />
              )}

              <div className="text-sm text-gray-500">
                <p>✓ Free shipping on orders over $50</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Custom design available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
