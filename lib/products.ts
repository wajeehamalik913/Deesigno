export interface Product {
  id: string
  title: string
  handle: string
  description: string
  featuredImage: {
    url: string
    altText: string
  }
  price: number
  category: string
  variants?: {
    size?: string[]
    color?: string[]
  }
}

// This will be the fallback/default products
export const products: Product[] = [
  {
    id: "custom-tshirts",
    title: "Custom T-Shirts",
    handle: "custom-t-shirts",
    description: "High-quality custom printed t-shirts perfect for your brand. Available in various sizes and colors.",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Custom T-Shirt",
    },
    price: 19.99,
    category: "apparel",
    variants: {
      size: ["XS", "S", "M", "L", "XL", "XXL"],
      color: ["Black", "White", "Navy", "Gray", "Red"],
    },
  },
  {
    id: "custom-hoodies",
    title: "Custom Hoodies",
    handle: "custom-hoodies",
    description: "Comfortable custom hoodies with your design. Perfect for teams, events, or personal use.",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Custom Hoodie",
    },
    price: 39.99,
    category: "apparel",
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "Gray", "Navy", "Maroon"],
    },
  },
  {
    id: "water-bottles",
    title: "Custom Water Bottles",
    handle: "water-bottles",
    description: "Durable stainless steel water bottles with custom printing. Keep your brand hydrated!",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Custom Water Bottle",
    },
    price: 24.99,
    category: "drinkware",
    variants: {
      color: ["Silver", "Black", "Blue", "White"],
    },
  },
  {
    id: "custom-mugs",
    title: "Custom Mugs",
    handle: "custom-mugs",
    description: "Ceramic mugs with custom printing. Perfect for offices, gifts, or promotional items.",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Custom Mug",
    },
    price: 14.99,
    category: "drinkware",
    variants: {
      color: ["White", "Black", "Blue", "Red"],
    },
  },
]

// Function to get products from localStorage or fallback to default
export function getProducts(): Product[] {
  if (typeof window !== "undefined") {
    const savedProducts = localStorage.getItem("deesigno-products")
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts)
      } catch (error) {
        console.error("Error parsing saved products:", error)
      }
    }
  }
  return products
}

export function getProduct(handle: string): Product | undefined {
  const allProducts = getProducts()
  return allProducts.find((product) => product.handle === handle)
}

export function getProductsByCategory(category: string): Product[] {
  const allProducts = getProducts()
  return allProducts.filter((product) => product.category === category)
}
