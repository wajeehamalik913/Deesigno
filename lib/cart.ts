"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ShopifyCart } from "./types"
import { createCart, addToCart as addToCartAction, getCart as getCartAction } from "./cart-actions"

interface CartStore {
  cart: ShopifyCart | null
  isLoading: boolean
  createCart: () => Promise<void>
  addToCart: (variantId: string, quantity: number) => Promise<void>
  getCart: () => Promise<void>
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,

      createCart: async () => {
        set({ isLoading: true })
        try {
          const cart = await createCart()
          set({ cart, isLoading: false })
        } catch (error) {
          console.error("Error creating cart:", error)
          set({ isLoading: false })
        }
      },

      addToCart: async (variantId: string, quantity = 1) => {
        set({ isLoading: true })
        const { cart } = get()

        try {
          // Create cart if it doesn't exist
          if (!cart) {
            await get().createCart()
          }

          const currentCart = get().cart
          if (!currentCart) {
            throw new Error("Failed to create cart")
          }

          const updatedCart = await addToCartAction(currentCart.id, variantId, quantity)
          set({ cart: updatedCart, isLoading: false })
        } catch (error) {
          console.error("Error adding to cart:", error)
          set({ isLoading: false })
        }
      },

      getCart: async () => {
        const { cart } = get()
        if (!cart) return

        set({ isLoading: true })
        try {
          const updatedCart = await getCartAction(cart.id)
          set({ cart: updatedCart, isLoading: false })
        } catch (error) {
          console.error("Error fetching cart:", error)
          set({ isLoading: false })
        }
      },

      clearCart: () => {
        set({ cart: null })
      },
    }),
    {
      name: "deesigno-cart",
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
)
