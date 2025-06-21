"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onAltTextChange?: (altText: string) => void
  altText?: string
  className?: string
}

export function ImageUpload({ value, onChange, onAltTextChange, altText = "", className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        onChange(result.url)
        // Auto-generate alt text from filename if not provided
        if (!altText && onAltTextChange) {
          const filename = file.name.split(".")[0]
          onAltTextChange(filename.replace(/[-_]/g, " "))
        }
      } else {
        alert(result.error || "Failed to upload image")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)

    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const removeImage = () => {
    onChange("")
    if (onAltTextChange) {
      onAltTextChange("")
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Image Preview */}
      {value && (
        <div className="relative">
          <div className="aspect-square w-full max-w-xs bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={value || "/placeholder.svg"}
              alt={altText || "Product image"}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Upload Area */}
      {!value && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center space-y-4">
            <ImageIcon className="h-12 w-12 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600 mb-2">Drag and drop an image here, or click to select</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : "Choose Image"}
              </Button>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {/* Manual URL Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Or enter image URL manually:</label>
        <Input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Alt Text Input */}
      {onAltTextChange && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Alt Text (for accessibility):</label>
          <Input
            type="text"
            value={altText}
            onChange={(e) => onAltTextChange(e.target.value)}
            placeholder="Describe the image..."
          />
        </div>
      )}
    </div>
  )
}
