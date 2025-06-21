import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.product || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system

    console.log("Contact form submission:", body)

    // Simulate email sending
    const emailData = {
      to: "hello@deesigno.com",
      from: body.email,
      subject: `New Quote Request: ${body.product}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
        <p><strong>Product:</strong> ${body.product}</p>
        <p><strong>Quantity:</strong> ${body.quantity || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    }

    return NextResponse.json({
      message: "Quote request submitted successfully!",
      id: `quote-${Date.now()}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit quote request" }, { status: 500 })
  }
}
