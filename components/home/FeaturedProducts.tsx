"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  images: string[];
  seller: {
    name: string;
  };
  condition: {
    name: string;
  };
  views: number;
  likes: number;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - replace with actual API call
    const mockProducts: Product[] = [
      {
        id: "1",
        title: "Vintage Leather Jacket",
        price: 89.99,
        originalPrice: 150.00,
        images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"],
        seller: { name: "Sarah M." },
        condition: { name: "Very Good" },
        views: 234,
        likes: 18
      },
      {
        id: "2",
        title: "Designer Handbag",
        price: 245.00,
        originalPrice: 450.00,
        images: ["https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"],
        seller: { name: "Emma K." },
        condition: { name: "Excellent" },
        views: 156,
        likes: 32
      },
      {
        id: "3",
        title: "Casual Summer Dress",
        price: 35.00,
        originalPrice: 65.00,
        images: ["https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"],
        seller: { name: "Lisa R." },
        condition: { name: "Good" },
        views: 89,
        likes: 12
      },
      {
        id: "4",
        title: "Sneakers Collection",
        price: 120.00,
        originalPrice: 200.00,
        images: ["https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"],
        seller: { name: "Mike D." },
        condition: { name: "Very Good" },
        views: 301,
        likes: 45
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto shimmer"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-64 bg-gray-200 shimmer"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Items
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked items from our community of sellers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg">
              <div className="relative">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 rounded-full p-2"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>by {product.seller.name}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {product.condition.name}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{product.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{product.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/browse">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              View All Items
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}