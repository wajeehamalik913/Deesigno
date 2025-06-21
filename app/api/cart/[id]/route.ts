import { type NextRequest, NextResponse } from "next/server"
import { getCart } from "@/lib/cart-actions"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cart = await getCart(params.id)

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Get cart error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
