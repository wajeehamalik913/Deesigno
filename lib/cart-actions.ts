"use server"

import { shopifyFetch, createCartQuery, addToCartQuery, getCartQuery } from "./shopify"
import type { ShopifyCart } from "./types"

export async function createCart(): Promise<ShopifyCart | null> {
  try {
    const { body } = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
      query: createCartQuery,
      variables: {
        input: {},
      },
    })

    return body.cartCreate.cart
  } catch (error) {
    console.error("Error creating cart:", error)
    return null
  }
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart | null> {
  try {
    const { body } = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
      query: addToCartQuery,
      variables: {
        cartId,
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
    })

    return body.cartLinesAdd.cart
  } catch (error) {
    console.error("Error adding to cart:", error)
    return null
  }
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const { body } = await shopifyFetch<{ cart: ShopifyCart }>({
      query: getCartQuery,
      variables: { id: cartId },
    })

    return body.cart
  } catch (error) {
    console.error("Error fetching cart:", error)
    return null
  }
}
