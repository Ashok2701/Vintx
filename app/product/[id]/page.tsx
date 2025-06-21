import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import RelatedProducts from "@/components/product/RelatedProducts";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Mock function - replace with actual API call
async function getProduct(id: string) {
  // Mock product data
  return {
    id,
    title: "Vintage Leather Jacket",
    description: "Beautiful vintage leather jacket in excellent condition. Perfect for fall and winter. This jacket has been well-maintained and shows minimal signs of wear.",
    price: 89.99,
    originalPrice: 150.00,
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
    ],
    seller: {
      id: "seller1",
      name: "Sarah M.",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      verified: true,
      rating: 4.8,
      totalSales: 156,
      joinedDate: "2022-03-15"
    },
    condition: { name: "Very Good" },
    brand: { name: "Zara" },
    category: { name: "Women", slug: "women" },
    size: { name: "M" },
    color: "Black",
    material: "Leather",
    views: 234,
    likes: 18,
    createdAt: "2024-01-15T10:00:00Z"
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetails product={product} />
      <div className="mt-16">
        <RelatedProducts categorySlug={product.category.slug} currentProductId={id} />
      </div>
    </div>
  );
}