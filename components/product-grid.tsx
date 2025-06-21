import Image from "next/image"
import Link from "next/link"
import type { ShopifyProduct } from "@/lib/types"
import { AddToCartButton } from "./add-to-cart-button"

interface ProductGridProps {
  products: ShopifyProduct[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const variant = product.variants.edges[0]?.node
        const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)

        return (
          <div
            key={product.id}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/products/${product.handle}`}>
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.featuredImage.url || "/placeholder.svg"}
                  alt={product.featuredImage.altText}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/products/${product.handle}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                  {product.title}
                </h3>
              </Link>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
              </div>

              <div className="mt-4">
                {variant && (
                  <AddToCartButton
                    variantId={variant.id}
                    availableForSale={variant.availableForSale}
                    productTitle={product.title}
                  />
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
