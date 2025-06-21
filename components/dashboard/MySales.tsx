"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, MessageCircle, Truck } from "lucide-react";

interface Sale {
  id: string;
  product: {
    id: string;
    title: string;
    images: string[];
  };
  buyer: {
    name: string;
    avatar: string;
  };
  price: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "completed";
  saleDate: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default function MySales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual API
    setTimeout(() => {
      const mockSales: Sale[] = [
        {
          id: "1",
          product: {
            id: "2",
            title: "Designer Handbag",
            images: ["https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"]
          },
          buyer: {
            name: "Emma K.",
            avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
          },
          price: 245.00,
          status: "shipped",
          saleDate: "2024-01-10T10:00:00Z",
          shippingAddress: {
            name: "Emma K.",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001"
          }
        },
      ];
      setSales(mockSales);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-green-100 text-green-800";
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

  if (sales.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">💰</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sales yet</h3>
        <p className="text-gray-600 mb-6">Your sold items will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sales.map((sale) => (
        <div key={sale.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={sale.product.images[0]}
                alt={sale.product.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{sale.product.title}</h3>
                  <p className="text-sm text-gray-600">Sold to {sale.buyer.name}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">${sale.price}</p>
                </div>
                
                <Badge className={getStatusColor(sale.status)}>
                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </Badge>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Shipping Address</h4>
                <p className="text-sm text-gray-600">
                  {sale.shippingAddress.name}<br />
                  {sale.shippingAddress.address}<br />
                  {sale.shippingAddress.city}, {sale.shippingAddress.state} {sale.shippingAddress.zipCode}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Buyer
                </Button>
                
                {sale.status === "confirmed" && (
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Truck className="w-4 h-4 mr-2" />
                    Mark as Shipped
                  </Button>
                )}
                
                <Button variant="outline" size="sm">
                  <Package className="w-4 h-4 mr-2" />
                  Print Label
                </Button>
              </div>
              
              <div className="text-sm text-gray-500 mt-3">
                <span>Sold {new Date(sale.saleDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}