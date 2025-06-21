"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, MessageCircle, Star } from "lucide-react";

interface Purchase {
  id: string;
  product: {
    id: string;
    title: string;
    images: string[];
  };
  seller: {
    name: string;
    avatar: string;
  };
  price: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  trackingNumber?: string;
}

export default function MyPurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual API
    setTimeout(() => {
      const mockPurchases: Purchase[] = [
        {
          id: "1",
          product: {
            id: "1",
            title: "Vintage Leather Jacket",
            images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"]
          },
          seller: {
            name: "Sarah M.",
            avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
          },
          price: 89.99,
          status: "delivered",
          orderDate: "2024-01-15T10:00:00Z",
          trackingNumber: "1Z999AA1234567890"
        },
      ];
      setPurchases(mockPurchases);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="animate-pulse flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🛍️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
        <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
        <Link href="/browse">
          <Button className="bg-primary hover:bg-primary/90">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <div key={purchase.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={purchase.product.images[0]}
                alt={purchase.product.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{purchase.product.title}</h3>
                  <p className="text-sm text-gray-600">Sold by {purchase.seller.name}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">${purchase.price}</p>
                </div>
                
                <Badge className={getStatusColor(purchase.status)}>
                  {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <Link href={`/product/${purchase.product.id}`}>
                  <Button variant="outline" size="sm">
                    <Package className="w-4 h-4 mr-2" />
                    View Item
                  </Button>
                </Link>
                
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Seller
                </Button>
                
                {purchase.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    Leave Review
                  </Button>
                )}
              </div>
              
              <div className="text-sm text-gray-500 mt-3">
                <span>Ordered {new Date(purchase.orderDate).toLocaleDateString()}</span>
                {purchase.trackingNumber && (
                  <span className="ml-4">Tracking: {purchase.trackingNumber}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}