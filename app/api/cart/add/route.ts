import { type NextRequest, NextResponse } from "next/server"
import { addToCart } from "@/lib/cart-actions"

export async function POST(request: NextRequest) {
  try {
    const { cartId, variantId, quantity } = await request.json()

    if (!cartId || !variantId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const cart = await addToCart(cartId, variantId, quantity || 1)

    if (!cart) {
      return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
    }

    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
