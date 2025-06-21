"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Upload, Camera } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export default function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return;

    if (images.length + files.length > 10) {
      toast.error("You can upload a maximum of 10 images");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Mock upload - replace with actual upload logic
        return new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve(URL.createObjectURL(file));
          }, 1000);
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedUrls]);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          className="hidden"
          id="image-upload"
          disabled={uploading || images.length >= 10}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="space-y-2">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              {uploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {uploading ? "Uploading..." : "Click to upload images"}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB each (max 10 images)
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                    Cover
                  </div>
                )}
              </div>
              
              {/* Controls */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => removeImage(index)}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
                {index > 0 && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => moveImage(index, 0)}
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-gray-500">
          Drag images to reorder. The first image will be your cover photo.
        </p>
      )}
    </div>
  );
}