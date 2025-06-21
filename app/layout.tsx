import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Deesigno - Custom Merchandise & Branded Products",
    template: "%s | Deesigno",
  },
  description:
    "Create custom t-shirts, hoodies, water bottles, mugs and more. Professional merchandise printing with fast turnaround times.",
  keywords: ["custom merchandise", "custom t-shirts", "branded products", "custom printing", "promotional items"],
  authors: [{ name: "Deesigno" }],
  creator: "Deesigno",
  publisher: "Deesigno",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Deesigno - Custom Merchandise & Branded Products",
    description:
      "Create custom t-shirts, hoodies, water bottles, mugs and more. Professional merchandise printing with fast turnaround times.",
    siteName: "Deesigno",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deesigno - Custom Merchandise & Branded Products",
    description:
      "Create custom t-shirts, hoodies, water bottles, mugs and more. Professional merchandise printing with fast turnaround times.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
