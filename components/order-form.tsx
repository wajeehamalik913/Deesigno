"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { sendToWhatsApp, sendCustomizationRequest, type OrderDetails } from "@/lib/whatsapp"
import { MessageCircle, Palette } from "lucide-react"
import type { Product } from "@/lib/products"

interface OrderFormProps {
  product: Product
  type: "order" | "customize"
}

export function OrderForm({ product, type }: OrderFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    size: "",
    color: "",
    quantity: 1,
    customization: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (type === "customize") {
      const customDetails = `Size: ${formData.size || "Not specified"}
Color: ${formData.color || "Not specified"}
Quantity: ${formData.quantity}
Custom Requirements: ${formData.customization || "Please contact me for custom design"}

Customer Details:
Name: ${formData.customerName}
Email: ${formData.customerEmail}
Phone: ${formData.customerPhone}`

      sendCustomizationRequest(product.title, customDetails)
    } else {
      const orderDetails: OrderDetails = {
        productName: product.title,
        price: product.price * formData.quantity,
        size: formData.size,
        color: formData.color,
        quantity: formData.quantity,
        customization: formData.customization,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
      }

      sendToWhatsApp(orderDetails)
    }

    setIsOpen(false)
    // Reset form
    setFormData({
      size: "",
      color: "",
      quantity: 1,
      customization: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    })
  }

  const buttonText = type === "customize" ? "Customize" : "Order Now"
  const buttonIcon = type === "customize" ? <Palette className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />
  const dialogTitle = type === "customize" ? `Customize ${product.title}` : `Order ${product.title}`

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={type === "customize" ? "outline" : "default"} className="flex-1">
          {buttonIcon}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Variants */}
          {product.variants?.size && (
            <div>
              <Label htmlFor="size">Size</Label>
              <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.size.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {product.variants?.color && (
            <div>
              <Label htmlFor="color">Color</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.color.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 1 })}
            />
          </div>

          {type === "customize" && (
            <div>
              <Label htmlFor="customization">Custom Design Details</Label>
              <Textarea
                id="customization"
                placeholder="Describe your custom design requirements..."
                value={formData.customization}
                onChange={(e) => setFormData({ ...formData, customization: e.target.value })}
              />
            </div>
          )}

          {/* Customer Details */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Your Details</h4>

            <div className="space-y-3">
              <div>
                <Label htmlFor="customerName">Name *</Label>
                <Input
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="customerPhone">Phone</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  placeholder="+971 XX XXX XXXX"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-medium">
              <span>Total:</span>
              <span>AED {(product.price * formData.quantity).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Send to WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
