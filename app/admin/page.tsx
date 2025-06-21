"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Save, Download, Upload } from "lucide-react"
import type { Product } from "@/lib/products"
import { ProtectedAdmin } from "@/components/protected-admin"
import { productsApi } from "@/lib/api-hooks"
import { ImageUpload } from "@/components/image-upload"

function AdminContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    description: "",
    price: 0,
    category: "",
    featuredImage: { url: "", altText: "" },
  })

  // Load products from API on component mount
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const fetchedProducts = await productsApi.getAll()
      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error loading products:", error)
      alert("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async () => {
    if (!newProduct.title || !newProduct.price) return

    try {
      const productData = {
        title: newProduct.title || "",
        description: newProduct.description || "",
        price: newProduct.price || 0,
        category: newProduct.category || "general",
        featuredImage: {
          url: newProduct.featuredImage?.url || "/placeholder.svg?height=400&width=400",
          altText: newProduct.featuredImage?.altText || newProduct.title || "",
        },
      }

      const createdProduct = await productsApi.create(productData)
      setProducts([...products, createdProduct])

      setNewProduct({
        title: "",
        description: "",
        price: 0,
        category: "",
        featuredImage: { url: "", altText: "" },
      })
      setIsAddingProduct(false)
      alert("Product added successfully!")
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Failed to add product")
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return

    try {
      const updatedProduct = await productsApi.update(editingProduct.id, editingProduct)
      setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))
      setEditingProduct(null)
      alert("Product updated successfully!")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update product")
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await productsApi.delete(id)
      setProducts(products.filter((p) => p.id !== id))
      alert("Product deleted successfully!")
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product")
    }
  }

  const exportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "products.json"
    link.click()
  }

  const importProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const importedProducts = JSON.parse(e.target?.result as string)

        // Create each product via API
        for (const product of importedProducts) {
          const { id, handle, ...productData } = product
          await productsApi.create(productData)
        }

        // Reload products
        await loadProducts()
        alert("Products imported successfully!")
      } catch (error) {
        console.error("Error importing products:", error)
        alert("Error importing products. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Product Management</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button onClick={exportProducts} variant="outline" size="sm" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <label className="cursor-pointer w-full sm:w-auto">
              <Button variant="outline" size="sm" asChild className="w-full">
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </span>
              </Button>
              <input type="file" accept=".json" onChange={importProducts} className="hidden" />
            </label>
            <Button onClick={() => setIsAddingProduct(true)} className="bg-slate-900 w-full sm:w-auto" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg truncate">{product.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEditProduct(product)} className="p-1">
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteProduct(product.id)} className="p-1">
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={product.featuredImage.url || "/placeholder.svg"}
                    alt={product.featuredImage.altText}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Product Dialog */}
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Title</label>
                  <Input
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    placeholder="Custom T-Shirts"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                    placeholder="19.99"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select category</option>
                  <option value="apparel">Apparel</option>
                  <option value="drinkware">Drinkware</option>
                  <option value="accessories">Accessories</option>
                  <option value="promotional">Promotional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="High-quality custom printed t-shirts..."
                  rows={3}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
                <ImageUpload
                  value={newProduct.featuredImage?.url}
                  onChange={(url) =>
                    setNewProduct({
                      ...newProduct,
                      featuredImage: {
                        url,
                        altText: newProduct.featuredImage?.altText || newProduct.title || "",
                      },
                    })
                  }
                  onAltTextChange={(altText) =>
                    setNewProduct({
                      ...newProduct,
                      featuredImage: {
                        ...newProduct.featuredImage,
                        url: newProduct.featuredImage?.url || "",
                        altText,
                      },
                    })
                  }
                  altText={newProduct.featuredImage?.altText}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingProduct(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleAddProduct} className="bg-slate-900 w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Title</label>
                    <Input
                      value={editingProduct.title}
                      onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="apparel">Apparel</option>
                    <option value="drinkware">Drinkware</option>
                    <option value="accessories">Accessories</option>
                    <option value="promotional">Promotional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    rows={3}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Product Image</label>
                  <ImageUpload
                    value={editingProduct.featuredImage.url}
                    onChange={(url) =>
                      setEditingProduct({
                        ...editingProduct,
                        featuredImage: { ...editingProduct.featuredImage, url },
                      })
                    }
                    onAltTextChange={(altText) =>
                      setEditingProduct({
                        ...editingProduct,
                        featuredImage: { ...editingProduct.featuredImage, altText },
                      })
                    }
                    altText={editingProduct.featuredImage.altText}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingProduct(null)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateProduct} className="bg-slate-900 w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Update Product
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedAdmin>
      <AdminContent />
    </ProtectedAdmin>
  )
}
