import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered Shopping for India
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Find the best products with price comparisons across Amazon,
            Flipkart, and more. Get exclusive deals and price alerts.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/search"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2"
            >
              Start Shopping <ArrowRight size={20} />
            </Link>
            <Link
              href="/pro"
              className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why FineZ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Search</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Just describe what you need. Our AI understands your intent and
                finds the perfect products.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Price Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set price alerts and get notified when your favorite products
                drop in price.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Comparisons</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Compare prices across all platforms instantly. See specs, reviews,
                and ratings side-by-side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to save on your next purchase?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Join thousands of smart shoppers using FineZ every day
          </p>
          <Link
            href="/search"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Search Now
          </Link>
        </div>
      </section>
    </div>
  );
}
