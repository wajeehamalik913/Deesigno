import type { Product } from "./products"

const API_BASE = "/api"

// API response types
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Products API functions
export const productsApi = {
  // Get all products
  async getAll(category?: string): Promise<Product[]> {
    const url = category && category !== "all" ? `${API_BASE}/products?category=${category}` : `${API_BASE}/products`

    const response = await fetch(url)
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch products")
    }

    return data.products
  },

  // Get single product
  async getById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/${id}`)
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch product")
    }

    return data.product
  },

  // Create product
  async create(productData: Omit<Product, "id" | "handle">): Promise<Product> {
    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to create product")
    }

    return data.product
  },

  // Update product
  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to update product")
    }

    return data.product
  },

  // Delete product
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to delete product")
    }
  },
}
