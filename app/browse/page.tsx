"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSidebar from "@/components/product/FilterSidebar";
import SortDropdown from "@/components/product/SortDropdown";
import { Loader2 } from "lucide-react";

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

export default function BrowsePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    condition: "",
    priceMin: "",
    priceMax: "",
    size: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy, query]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      const mockProducts: Product[] = [
        {
          id: "1",
          title: "Vintage Leather Jacket",
          price: 89.99,
          originalPrice: 150.00,
          images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"],
          seller: { name: "Sarah M.", verified: true },
          condition: { name: "Very Good" },
          brand: { name: "Zara" },
          category: { name: "Women" },
          views: 234,
          likes: 18
        },
        // Add more mock products...
      ];
      
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <FilterSidebar filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {query ? `Search results for "${query}"` : "Browse Items"}
              </h1>
              <p className="text-gray-600 mt-1">
                {loading ? "Loading..." : `${products.length} items found`}
              </p>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}