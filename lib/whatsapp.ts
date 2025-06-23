export interface OrderDetails {
  productName: string
  price: number
  size?: string
  color?: string
  quantity?: number
  customization?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
}

export function generateWhatsAppMessage(details: OrderDetails): string {
  let message = `🛍️ *New Order Inquiry*\n\n`
  message += `📦 *Product:* ${details.productName}\n`
  message += `💰 *Price:* AED ${details.price.toFixed(2)}\n`

  if (details.size) {
    message += `📏 *Size:* ${details.size}\n`
  }

  if (details.color) {
    message += `🎨 *Color:* ${details.color}\n`
  }

  if (details.quantity) {
    message += `🔢 *Quantity:* ${details.quantity}\n`
  }

  if (details.customization) {
    message += `✨ *Customization:* ${details.customization}\n`
  }

  message += `\n👤 *Customer Details:*\n`

  if (details.customerName) {
    message += `Name: ${details.customerName}\n`
  }

  if (details.customerEmail) {
    message += `Email: ${details.customerEmail}\n`
  }

  if (details.customerPhone) {
    message += `Phone: ${details.customerPhone}\n`
  }

  message += `\n📱 Sent via Deesigno Website`

  return encodeURIComponent(message)
}

export function sendToWhatsApp(details: OrderDetails): void {
  const businessNumber = "971568282669" // Your business number
  const message = generateWhatsAppMessage(details)
  const whatsappUrl = `https://wa.me/${businessNumber}?text=${message}`

  window.open(whatsappUrl, "_blank")
}

export function generateCustomizationMessage(productName: string, customDetails: string): string {
  let message = `🎨 *Custom Design Request*\n\n`
  message += `📦 *Product:* ${productName}\n`
  message += `✨ *Custom Requirements:*\n${customDetails}\n\n`
  message += `📱 Sent via Deesigno Website`

  return encodeURIComponent(message)
}

export function sendCustomizationRequest(productName: string, customDetails: string): void {
  const businessNumber = "971568282669"
  const message = generateCustomizationMessage(productName, customDetails)
  const whatsappUrl = `https://wa.me/${businessNumber}?text=${message}`

  window.open(whatsappUrl, "_blank")
}
