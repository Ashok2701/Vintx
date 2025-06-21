import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import Stats from "@/components/home/Stats";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <HowItWorks />
      <Stats />
    </div>
  );
}