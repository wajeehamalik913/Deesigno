import { type NextRequest, NextResponse } from "next/server"
import { getAllProducts, createProduct } from "@/lib/data-store"

// Validation function (replacing zod for simplicity)
const validateProduct = (data: any) => {
  const errors: string[] = []

  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push("Title is required")
  }

  if (!data.description || typeof data.description !== "string" || data.description.trim().length === 0) {
    errors.push("Description is required")
  }

  if (typeof data.price !== "number" || data.price < 0) {
    errors.push("Price must be a positive number")
  }

  if (!data.category || typeof data.category !== "string" || data.category.trim().length === 0) {
    errors.push("Category is required")
  }

  return errors
}

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let products = await getAllProducts()

    // Filter by category if provided
    if (category && category !== "all") {
      products = products.filter((product) => product.category === category)
    }

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationErrors = validateProduct(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validationErrors },
        { status: 400 },
      )
    }

    // Set default image if not provided
    const productData = {
      title: body.title.trim(),
      description: body.description.trim(),
      price: Number(body.price),
      category: body.category.trim(),
      featuredImage: {
        url: body.featuredImage?.url || "/placeholder.svg?height=400&width=400",
        altText: body.featuredImage?.altText || body.title.trim(),
      },
    }

    const newProduct = await createProduct(productData)

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
