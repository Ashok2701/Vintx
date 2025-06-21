"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  images: string[];
  seller: {
    name: string;
    verified: boolean;
  };
  condition: {
    name: string;
  };
  brand?: {
    name: string;
  };
  category: {
    name: string;
  };
  views: number;
  likes: number;
}

interface RelatedProductsProps {
  categorySlug: string;
  currentProductId: string;
}

export default function RelatedProducts({ categorySlug, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual API
    const mockProducts: Product[] = [
      {
        id: "2",
        title: "Designer Handbag",
        price: 245.00,
        originalPrice: 450.00,
        images: ["https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"],
        seller: { name: "Emma K.", verified: true },
        condition: { name: "Excellent" },
        brand: { name: "Gucci" },
        category: { name: "Women" },
        views: 156,
        likes: 32
      },
      // Add more mock products...
    ];

    setTimeout(() => {
      setProducts(mockProducts.filter(p => p.id !== currentProductId));
      setLoading(false);
    }, 1000);
  }, [categorySlug, currentProductId]);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-64 bg-gray-200 shimmer"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}