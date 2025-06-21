import ProductCard from "./ProductCard";

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

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}