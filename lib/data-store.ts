import type { Product } from "./products"

// In-memory storage (in production, this would be a database)
let productsStore: Product[] = []

// Initialize with default products
const initializeStore = async () => {
  if (productsStore.length === 0) {
    // Import default products
    const { products: defaultProducts } = await import("./products")
    productsStore = [...defaultProducts]
  }
}

export const getAllProducts = async (): Promise<Product[]> => {
  await initializeStore()
  return [...productsStore]
}

export const getProductById = async (id: string): Promise<Product | null> => {
  await initializeStore()
  return productsStore.find((product) => product.id === id) || null
}

export const createProduct = async (productData: Omit<Product, "id" | "handle">): Promise<Product> => {
  await initializeStore()

  const newProduct: Product = {
    id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    handle: productData.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    ...productData,
  }

  productsStore.push(newProduct)
  return newProduct
}

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  await initializeStore()

  const index = productsStore.findIndex((product) => product.id === id)
  if (index === -1) return null

  // Update handle if title changed
  if (updates.title) {
    updates.handle = updates.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  productsStore[index] = { ...productsStore[index], ...updates }
  return productsStore[index]
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  await initializeStore()

  const index = productsStore.findIndex((product) => product.id === id)
  if (index === -1) return false

  productsStore.splice(index, 1)
  return true
}
