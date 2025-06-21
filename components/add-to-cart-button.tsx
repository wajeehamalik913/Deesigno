"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart"
import { ShoppingCart, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  variantId: string
  availableForSale: boolean
  productTitle: string
}

export function AddToCartButton({ variantId, availableForSale, productTitle }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart, isLoading } = useCartStore()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    if (!availableForSale) return

    setIsAdding(true)
    try {
      await addToCart(variantId, 1)
      toast({
        title: "Added to cart!",
        description: `${productTitle} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  if (!availableForSale) {
    return (
      <Button disabled className="w-full">
        Sold Out
      </Button>
    )
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding || isLoading} className="w-full">
      {isAdding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
