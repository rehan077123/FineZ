"use client";

import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/hooks";
import { formatPrice, getRatingColor } from "@/utils/helpers";
import { Star, Loader, ArrowLeft } from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: product, isLoading } = useProduct(params.id);
  // const { data: priceHistory } = usePriceHistory(params.id);
  // const { data: reviews } = useReviews(
  //   params.id,
  //   product?.platform || "AMAZON"
  // );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-8">
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {product.brand}
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className={`text-lg font-bold ${getRatingColor(product.rating || 0)}`}>
                  {product.rating}
                </span>
                <span className="text-gray-600">
                  ({product.ratingCount || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-blue-600">
                  {formatPrice(product.currentPrice || 0)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      {product.discountPercent}% off
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              {product.link ? (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 text-center transition"
                >
                  Buy Now
                </a>
              ) : (
                <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-bold cursor-not-allowed">
                  Buy Now
                </button>
              )}
              <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-slate-800">
                Compare
              </button>
            </div>

            {/* Stock */}
            <p className={`text-lg font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* AI Summary */}
        {product.aiSummary && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
              FineZ AI Summary
            </h3>
            <p className="text-blue-800 dark:text-blue-100">
              {product.aiSummary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
