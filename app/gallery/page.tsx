import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Gallery",
  description: "Browse our portfolio of custom merchandise projects and get inspired for your next order.",
}

export default function GalleryPage() {
  const portfolioItems = [
    {
      id: 1,
      title: "Corporate T-Shirts",
      category: "Apparel",
      image: "/placeholder.svg?height=300&width=400",
      description: "Custom branded t-shirts for tech startup team building event",
    },
    {
      id: 2,
      title: "Event Hoodies",
      category: "Apparel",
      image: "/placeholder.svg?height=300&width=400",
      description: "Limited edition hoodies for annual conference attendees",
    },
    {
      id: 3,
      title: "Promotional Water Bottles",
      category: "Drinkware",
      image: "/placeholder.svg?height=300&width=400",
      description: "Eco-friendly water bottles for environmental awareness campaign",
    },
    {
      id: 4,
      title: "Custom Coffee Mugs",
      category: "Drinkware",
      image: "/placeholder.svg?height=300&width=400",
      description: "Personalized mugs for local coffee shop loyalty program",
    },
    {
      id: 5,
      title: "Branded Tote Bags",
      category: "Accessories",
      image: "/placeholder.svg?height=300&width=400",
      description: "Canvas tote bags for retail store promotional campaign",
    },
    {
      id: 6,
      title: "Team Caps",
      category: "Accessories",
      image: "/placeholder.svg?height=300&width=400",
      description: "Embroidered caps for sports team sponsorship",
    },
  ]

  const categories = ["All", "Apparel", "Drinkware", "Accessories"]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Work</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of custom merchandise projects. Get inspired and see the quality we deliver for our
            clients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button key={category} variant="outline" className="hover:bg-slate-900 hover:text-white">
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gray-100">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Create Your Custom Merchandise?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust Deesigno for their custom printing needs. Let's bring your
            vision to life with the same quality and attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                Get Your Quote
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
