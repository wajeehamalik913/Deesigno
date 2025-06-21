import { NextResponse } from "next/server"
import { createCart } from "@/lib/cart-actions"

export async function POST() {
  try {
    const cart = await createCart()

    if (!cart) {
      return NextResponse.json({ error: "Failed to create cart" }, { status: 500 })
    }

    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Cart creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
