"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    category: string;
    brand: string;
    condition: string;
    priceMin: string;
    priceMax: string;
    size: string;
  };
  onFiltersChange: (filters: any) => void;
}

const categories = ["Women", "Men", "Kids", "Shoes", "Accessories"];
const brands = ["Zara", "H&M", "Nike", "Adidas", "Gucci", "Prada"];
const conditions = ["New with tags", "Excellent", "Very Good", "Good"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 500]);

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      brand: "",
      condition: "",
      priceMin: "",
      priceMax: "",
      size: "",
    });
    setPriceRange([0, 500]);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Category Filter */}
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3 block">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.category === category}
                onCheckedChange={(checked) => 
                  updateFilter("category", checked ? category : "")
                }
              />
              <Label htmlFor={category} className="text-sm text-gray-700">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3 block">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="w-full"
        />
      </div>

      {/* Brand Filter */}
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3 block">Brand</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={filters.brand === brand}
                onCheckedChange={(checked) => 
                  updateFilter("brand", checked ? brand : "")
                }
              />
              <Label htmlFor={brand} className="text-sm text-gray-700">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3 block">Condition</Label>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={condition}
                checked={filters.condition === condition}
                onCheckedChange={(checked) => 
                  updateFilter("condition", checked ? condition : "")
                }
              />
              <Label htmlFor={condition} className="text-sm text-gray-700">
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3 block">Size</Label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={filters.size === size ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("size", filters.size === size ? "" : size)}
              className="text-xs"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}