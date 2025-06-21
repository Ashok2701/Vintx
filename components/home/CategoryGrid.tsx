import Link from "next/link";
import { Shirt, Zap, Baby, Gem, Footprints, Briefcase } from "lucide-react";

const categories = [
  {
    name: "Women",
    icon: Shirt,
    href: "/women",
    color: "bg-pink-100 text-pink-600",
    items: "12.5k items"
  },
  {
    name: "Men",
    icon: Briefcase,
    href: "/men",
    color: "bg-blue-100 text-blue-600",
    items: "8.2k items"
  },
  {
    name: "Kids",
    icon: Baby,
    href: "/kids",
    color: "bg-green-100 text-green-600",
    items: "3.1k items"
  },
  {
    name: "Shoes",
    icon: Footprints,
    href: "/shoes",
    color: "bg-purple-100 text-purple-600",
    items: "5.7k items"
  },
  {
    name: "Accessories",
    icon: Gem,
    href: "/accessories",
    color: "bg-yellow-100 text-yellow-600",
    items: "4.3k items"
  },
  {
    name: "Electronics",
    icon: Zap,
    href: "/electronics",
    color: "bg-indigo-100 text-indigo-600",
    items: "2.1k items"
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing pre-loved items across all categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.items}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}