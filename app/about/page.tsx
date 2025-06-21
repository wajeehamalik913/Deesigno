import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "About Us",
  description: "Learn about Deesigno's mission to provide high-quality custom merchandise solutions.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About Deesigno</h1>
          <p className="text-xl text-gray-600">
            Your trusted partner for custom merchandise and branded products since 2020.
          </p>
        </div>

        <div className="space-y-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2020, Deesigno emerged from a simple idea: custom merchandise should be accessible,
                affordable, and exceptional in quality. What started as a small printing operation has grown into a
                trusted partner for businesses, organizations, and individuals looking to make their mark.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that every brand deserves to stand out, and every design deserves to be brought to life with
                precision and care. That's why we've invested in state-of-the-art printing technology and built a team
                of passionate professionals who share our commitment to excellence.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower brands and individuals by transforming their creative visions into high-quality, tangible
                  products that make lasting impressions. We're committed to delivering exceptional custom merchandise
                  that exceeds expectations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Our Values</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    • <strong>Quality First:</strong> Every product meets our high standards
                  </li>
                  <li>
                    • <strong>Customer Focus:</strong> Your success is our priority
                  </li>
                  <li>
                    • <strong>Innovation:</strong> We embrace new technologies and methods
                  </li>
                  <li>
                    • <strong>Reliability:</strong> Consistent delivery on time, every time
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Deesigno?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h4 className="font-semibold mb-2">Premium Quality</h4>
                  <p className="text-sm text-gray-600">
                    We use only the finest materials and latest printing techniques
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-semibold mb-2">Fast Turnaround</h4>
                  <p className="text-sm text-gray-600">Most orders completed within 3-5 business days</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h4 className="font-semibold mb-2">Expert Support</h4>
                  <p className="text-sm text-gray-600">Our design team helps bring your vision to life</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Let's discuss your custom merchandise needs and create something amazing together.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                Get Your Quote Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
