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
      <div className="relative overflow-hidden rounded-md mb-3">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
      </div>
      {title && (
        <>
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          {price && <p className="text-sm font-bold text-slate-900">{price}</p>}
        </>
      )}
    </div>
  )
}
