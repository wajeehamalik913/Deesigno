import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "About Us",
  description: "Learn about Deesigno's journey from streetwear brand to custom printing specialists.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About Deesigno</h1>
          <p className="text-xl text-gray-600">Where fashion meets creativity - your style, amplified since 2020.</p>
        </div>

        <div className="space-y-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Deesigno started as a passion project in 2020 - a small clothing brand with big dreams. What began as
                designing trendy streetwear quickly evolved when we realized our customers wanted more than just
                off-the-rack pieces. They wanted to express their individuality.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we&apos;re both a fashion-forward clothing brand and a custom printing specialist. Whether
                you&apos;re looking for the latest trends or want to create something uniquely yours, we&apos;ve got you
                covered. From our curated collections to personalized designs, every piece tells a story.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To democratize fashion and self-expression. We believe everyone deserves to wear their personality,
                  whether that&apos;s through our carefully curated collections or custom designs that bring your vision
                  to life.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Our Values</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    • <strong>Creativity First:</strong> Every design tells a story
                  </li>
                  <li>
                    • <strong>Quality Always:</strong> Premium materials and craftsmanship
                  </li>
                  <li>
                    • <strong>Individual Expression:</strong> Your style, your way
                  </li>
                  <li>
                    • <strong>Community Driven:</strong> Built by and for creatives
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What Makes Us Different?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👕</span>
                  </div>
                  <h4 className="font-semibold mb-2">Curated Collections</h4>
                  <p className="text-sm text-gray-600">
                    Hand-picked designs that blend current trends with timeless style
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="font-semibold mb-2">Custom Everything</h4>
                  <p className="text-sm text-gray-600">From personal designs to bulk orders - we print it all</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-semibold mb-2">Fast & Reliable</h4>
                  <p className="text-sm text-gray-600">Quick turnaround without compromising on quality</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Express Yourself?</h2>
            <p className="text-gray-600 mb-6">
              Browse our collections or create something custom. Your style journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Start Custom Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
