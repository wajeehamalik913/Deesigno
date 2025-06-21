"use client"

import Image from "next/image"
import { useState } from "react"

interface ProductShowcaseImageProps {
  src: string
  alt: string
  title: string
  price: string
  className?: string
}

export function ProductShowcaseImage({ src, alt, title, price, className }: ProductShowcaseImageProps) {
  const [imageSrc, setImageSrc] = useState(src)

  const handleImageError = () => {
    console.log("Image failed to load:", src)
    setImageSrc("/placeholder.svg?height=200&width=200")
  }

  return (
    <div className={className}>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        width={200}
        height={200}
        className="w-full h-40 object-cover rounded-md mb-3"
        onError={handleImageError}
      />
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-gray-500">{price}</p>
    </div>
  )
}
