"use client"

import { useEffect } from "react"
import { useCartStore } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

export function CartDrawer() {
  const { cart, getCart, isLoading } = useCartStore()

  useEffect(() => {
    if (cart) {
      getCart()
    }
  }, [])

  const itemCount = cart?.totalQuantity || 0
  const total = cart?.cost?.totalAmount?.amount || "0"
  const currencyCode = cart?.cost?.totalAmount?.currencyCode || "USD"

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        <div className="mt-8">
          {!cart || cart.lines.edges.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.lines.edges.map(({ node: item }) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.merchandise.product.featuredImage.url || "/placeholder.svg"}
                        alt={item.merchandise.product.featuredImage.altText}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.merchandise.product.title}</h3>
                      <p className="text-sm text-gray-500">{item.merchandise.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">
                          ${Number.parseFloat(item.merchandise.price.amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>
                    ${Number.parseFloat(total).toFixed(2)} {currencyCode}
                  </span>
                </div>
                <Button className="w-full mt-4" onClick={() => window.open(cart.checkoutUrl, "_blank")}>
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
