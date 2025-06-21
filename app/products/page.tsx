"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { productsApi } from "@/lib/api-hooks"

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const fetchedProducts = await productsApi.getAll(selectedCategory)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [selectedCategory])

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <div>
      <h1>Products</h1>

      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title} - {product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductsPage
