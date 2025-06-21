import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import HomeContent2 from "@/components/home/HomePage";

// Force dynamic rendering to ensure auth() has access to request context
export const dynamic = "force-dynamic";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category?: { name: string };
  createdAt: string;
}

interface UserResponse {
  role: string | null;
  userId?: string;
}

export default async function HomePage() {
  // Fetch user data through API route instead of using auth() directly
  let userData: UserResponse = { role: null };
  
  try {
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me`, {
      cache: "no-store",
    });
    
    if (userRes.ok) {
      userData = await userRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API Error:", text);
    throw new Error("Failed to load products");
  }

  const products: Product[] = await res.json();

  console.log("user details are ", userData);
  console.log("Products data =", products);

  if (products.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No products available yet.</p>;
  }

  return (
    <div className="w-full">
      {/* ✅ Full-width banner */}
      <HomeContent2 />
      {/* ✅ Section Title */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">
          {userData.role ? "Latest Products" : "Featured Products"}
        </h2>

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}