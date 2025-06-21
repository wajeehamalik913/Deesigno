export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  featuredImage: {
    url: string
    altText: string
    width: number
    height: number
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice?: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    edges: Array<{
      node: ShopifyVariant
    }>
  }
  images?: {
    edges: Array<{
      node: {
        url: string
        altText: string
        width: number
        height: number
      }
    }>
  }
}

export interface ShopifyVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: Array<{
    name: string
    value: string
  }>
  price: {
    amount: string
    currencyCode: string
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    edges: Array<{
      node: ShopifyCartLine
    }>
  }
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: {
      amount: string
      currencyCode: string
    }
    product: {
      title: string
      handle: string
      featuredImage: {
        url: string
        altText: string
        width: number
        height: number
      }
    }
  }
}
