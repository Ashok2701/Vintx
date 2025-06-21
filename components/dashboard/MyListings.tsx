"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Listing {
  id: string;
  title: string;
  price: number;
  images: string[];
  status: "active" | "sold" | "inactive";
  views: number;
  likes: number;
  createdAt: string;
}

export default function MyListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual API
    setTimeout(() => {
      const mockListings: Listing[] = [
        {
          id: "1",
          title: "Vintage Leather Jacket",
          price: 89.99,
          images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"],
          status: "active",
          views: 234,
          likes: 18,
          createdAt: "2024-01-15T10:00:00Z"
        },
        {
          id: "2",
          title: "Designer Handbag",
          price: 245.00,
          images: ["https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"],
          status: "sold",
          views: 156,
          likes: 32,
          createdAt: "2024-01-10T10:00:00Z"
        },
      ];
      setListings(mockListings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
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

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
        <p className="text-gray-600 mb-6">Start selling your items to see them here</p>
        <Link href="/sell">
          <Button className="bg-primary hover:bg-primary/90">Create Your First Listing</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <div key={listing.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                  <p className="text-lg font-bold text-gray-900 mb-2">${listing.price}</p>
                  <Badge className={getStatusColor(listing.status)}>
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </Badge>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mt-3">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{listing.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{listing.likes} likes</span>
                </div>
                <span>Listed {new Date(listing.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}