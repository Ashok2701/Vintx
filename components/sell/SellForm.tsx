"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "./ImageUpload";

export default function SellForm() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    brandId: "",
    sizeId: "",
    conditionId: "",
    color: "",
    material: "",
  });
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to sell items");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          images,
          sellerId: user.id,
        }),
      });

      if (response.ok) {
        toast.success("Item listed successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          price: "",
          originalPrice: "",
          categoryId: "",
          brandId: "",
          sizeId: "",
          conditionId: "",
          color: "",
          material: "",
        });
        setImages([]);
      } else {
        throw new Error("Failed to create listing");
      }
    } catch (error) {
      toast.error("Failed to create listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">List Your Item</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images */}
        <div>
          <Label className="text-base font-medium">Photos</Label>
          <p className="text-sm text-gray-600 mb-3">Add up to 10 photos. The first photo will be your cover image.</p>
          <ImageUpload images={images} onImagesChange={setImages} />
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-base font-medium">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            placeholder="e.g., Vintage Leather Jacket"
            required
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-base font-medium">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            placeholder="Describe your item's condition, fit, and any other details..."
            rows={4}
            required
            className="mt-1"
          />
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-medium">Category</Label>
            <Select value={formData.categoryId} onValueChange={(value) => updateFormData("categoryId", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium">Brand</Label>
            <Input
              value={formData.brandId}
              onChange={(e) => updateFormData("brandId", e.target.value)}
              placeholder="e.g., Zara, H&M, Nike"
              className="mt-1"
            />
          </div>
        </div>

        {/* Size & Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-medium">Size</Label>
            <Select value={formData.sizeId} onValueChange={(value) => updateFormData("sizeId", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
                <SelectItem value="xxl">XXL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium">Condition</Label>
            <Select value={formData.conditionId} onValueChange={(value) => updateFormData("conditionId", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New with tags</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="very-good">Very Good</SelectItem>
                <SelectItem value="good">Good</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Color & Material */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="color" className="text-base font-medium">Color</Label>
            <Input
              id="color"
              value={formData.color}
              onChange={(e) => updateFormData("color", e.target.value)}
              placeholder="e.g., Black, Navy Blue"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="material" className="text-base font-medium">Material</Label>
            <Input
              id="material"
              value={formData.material}
              onChange={(e) => updateFormData("material", e.target.value)}
              placeholder="e.g., Cotton, Leather, Polyester"
              className="mt-1"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price" className="text-base font-medium">Your Price</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => updateFormData("price", e.target.value)}
                placeholder="0.00"
                className="pl-8"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="originalPrice" className="text-base font-medium">Original Price (Optional)</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => updateFormData("originalPrice", e.target.value)}
                placeholder="0.00"
                className="pl-8"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90" 
          size="lg"
          disabled={loading}
        >
          {loading ? "Creating Listing..." : "List Item"}
        </Button>
      </form>
    </div>
  );
}