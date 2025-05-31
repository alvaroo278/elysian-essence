import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";

export function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Features />
      <Testimonials />
    </main>
  );
}
