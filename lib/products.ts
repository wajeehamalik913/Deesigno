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
    id: "boo-tshirt",
    title: "Boo! Graphic Tee",
    handle: "boo-graphic-tee",
    description:
      "Spooky vibes meet street style. Premium cotton tee with our signature Boo! design. Perfect for making a statement.",
    featuredImage: {
      url: "/boo!.jpg?height=400&width=400",
      altText: "Boo! Graphic T-Shirt",
    },
    price: 29.99,
    category: "apparel",
    variants: {
      size: ["XS", "S", "M", "L", "XL", "XXL"],
      color: ["Black", "White", "Navy", "Gray"],
    },
  },
  {
    id: "essential-hoodie",
    title: "Essential Hoodie",
    handle: "essential-hoodie",
    description:
      "Your new go-to hoodie. Soft fleece interior, relaxed fit, and available for custom printing. Comfort meets style.",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Essential Hoodie",
    },
    price: 49.99,
    category: "apparel",
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "Gray", "Navy", "Cream", "Forest Green"],
    },
  },
  {
    id: "streetwear-joggers",
    title: "Streetwear Joggers",
    handle: "streetwear-joggers",
    description:
      "Comfortable joggers with a modern fit. Perfect for lounging or street styling. Customize with your own design.",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Streetwear Joggers",
    },
    price: 39.99,
    category: "apparel",
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "Gray", "Navy", "Olive"],
    },
  },
  {
    id: "custom-cap",
    title: "Custom Snapback Cap",
    handle: "custom-snapback-cap",
    description:
      "Classic snapback design ready for your custom embroidery or print. Premium materials, adjustable fit.",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Custom Snapback Cap",
    },
    price: 24.99,
    category: "accessories",
    variants: {
      color: ["Black", "White", "Navy", "Gray", "Red"],
    },
  },
  {
    id: "oversized-tee",
    title: "Oversized Tee",
    handle: "oversized-tee",
    description:
      "Trendy oversized fit tee. Perfect canvas for custom designs or wear as-is for that effortless street style look.",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Oversized Tee",
    },
    price: 34.99,
    category: "apparel",
    variants: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Black", "White", "Beige", "Sage Green", "Dusty Pink"],
    },
  },
  {
    id: "tote-bag",
    title: "Canvas Tote Bag",
    handle: "canvas-tote-bag",
    description:
      "Eco-friendly canvas tote perfect for daily use. Great for custom printing - ideal for brands, events, or personal use.",
    featuredImage: {
      url: "/placeholder.svg?height=400&width=400",
      altText: "Canvas Tote Bag",
    },
    price: 19.99,
    category: "accessories",
    variants: {
      color: ["Natural", "Black", "Navy", "Forest Green"],
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
