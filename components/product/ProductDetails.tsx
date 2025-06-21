"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Shield, Truck, RotateCcw, Star, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

interface ProductDetailsProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    seller: {
      id: string;
      name: string;
      avatar: string;
      verified: boolean;
      rating: number;
      totalSales: number;
      joinedDate: string;
    };
    condition: { name: string };
    brand?: { name: string };
    category: { name: string };
    size?: { name: string };
    color?: string;
    material?: string;
    views: number;
    likes: number;
    createdAt: string;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Images */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={product.images[selectedImage]}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
              {discount}% OFF
            </div>
          )}
        </div>
        
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.brand && (
              <Badge variant="outline">{product.brand.name}</Badge>
            )}
            <Badge variant="outline">{product.category.name}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <Badge className="bg-green-100 text-green-800">{product.condition.name}</Badge>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          {product.size && (
            <div>
              <span className="text-sm text-gray-600">Size</span>
              <p className="font-medium">{product.size.name}</p>
            </div>
          )}
          {product.color && (
            <div>
              <span className="text-sm text-gray-600">Color</span>
              <p className="font-medium">{product.color}</p>
            </div>
          )}
          {product.material && (
            <div>
              <span className="text-sm text-gray-600">Material</span>
              <p className="font-medium">{product.material}</p>
            </div>
          )}
          <div>
            <span className="text-sm text-gray-600">Condition</span>
            <p className="font-medium">{product.condition.name}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsFavorited(!isFavorited)}
              className={isFavorited ? "text-red-500 border-red-500" : ""}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          
          <Button variant="outline" size="lg" className="w-full">
            Message Seller
          </Button>
        </div>

        {/* Seller Info */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={product.seller.avatar} />
              <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{product.seller.name}</h3>
                {product.seller.verified && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Verified</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.seller.rating}</span>
                </div>
                <span>{product.seller.totalSales} sales</span>
              </div>
            </div>
            <Link href={`/seller/${product.seller.id}`}>
              <Button variant="outline" size="sm">View Profile</Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {formatDate(product.seller.joinedDate)}</span>
            </div>
          </div>
        </div>

        {/* Trust & Safety */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Buyer Protection included</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Truck className="w-5 h-5 text-blue-600" />
            <span>Fast & secure shipping</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <RotateCcw className="w-5 h-5 text-purple-600" />
            <span>Easy returns within 14 days</span>
          </div>
        </div>
      </div>

      {/* Description & Details */}
      <div className="lg:col-span-2 mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Product Information</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Brand</dt>
                    <dd className="font-medium">{product.brand?.name || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Category</dt>
                    <dd className="font-medium">{product.category.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Condition</dt>
                    <dd className="font-medium">{product.condition.name}</dd>
                  </div>
                  {product.size && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Size</dt>
                      <dd className="font-medium">{product.size.name}</dd>
                    </div>
                  )}
                </dl>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Item Stats</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Views</dt>
                    <dd className="font-medium">{product.views}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Likes</dt>
                    <dd className="font-medium">{product.likes}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Listed</dt>
                    <dd className="font-medium">{formatDate(product.createdAt)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-900">Free Standard Shipping</h4>
                  <p className="text-green-700 text-sm">Delivery in 3-5 business days</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Items are carefully packaged and shipped within 1-2 business days</p>
                <p>• Tracking information provided once shipped</p>
                <p>• Signature required for items over $100</p>
                <p>• International shipping available (additional fees apply)</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}