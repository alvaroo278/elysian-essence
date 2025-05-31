import { useState, useEffect, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { PerfumeList } from "@/components/product/PerfumeList";
import { Perfume, Collection } from "@/lib/types";
import { perfumes as mockPerfumes, collections } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export function CatalogPage() {
  const [loading, setLoading] = useState(true);
  const [activeGenderTab, setActiveGenderTab] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate initial min/max prices for the slider
  const { minPrice, maxPrice } = useMemo(() => {
    if (!mockPerfumes || mockPerfumes.length === 0) {
      return { minPrice: 0, maxPrice: 100 }; // Default if no perfumes
    }
    const prices = mockPerfumes.map((p) => p.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, []); // mockPerfumes is static, so this runs once

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [globalFilteredPerfumes, setGlobalFilteredPerfumes] =
    useState<Perfume[]>(mockPerfumes);

  // Set initial price range once minPrice and maxPrice are calculated
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    // Simulate loading from API - kept for spinner effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...mockPerfumes];

    // Filter by gender tab
    if (activeGenderTab !== "todos") {
      result = result.filter(
        (perfume) =>
          activeGenderTab === "hombre"
            ? perfume.gender === "Hombre" || perfume.gender === "Unisex"
            : activeGenderTab === "mujer"
            ? perfume.gender === "Mujer" || perfume.gender === "Unisex"
            : true // Should not happen with current tabs
      );
    }

    // Filter by search query (name or collection name)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((perfume) => {
        const collectionName =
          collections.find((c) => c.id === perfume.collection)?.name || "";
        return (
          perfume.name.toLowerCase().includes(query) ||
          collectionName.toLowerCase().includes(query)
        );
      });
    }

    // Filter by price range
    result = result.filter(
      (perfume) =>
        perfume.price >= priceRange[0] && perfume.price <= priceRange[1]
    );

    setGlobalFilteredPerfumes(result);
  }, [mockPerfumes, activeGenderTab, searchQuery, priceRange]);

  return (
    <main>
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gold-text">
            Catálogo de Perfumes
          </h1>
          <p className="text-elysian-white-soft/80 max-w-2xl mx-auto">
            Descubre nuestra colección exclusiva de fragancias creadas con los
            ingredientes más selectos.
          </p>
        </div>

        {/* Filters UI */}
        <div className="mb-12 space-y-6">
          <Tabs value={activeGenderTab} onValueChange={setActiveGenderTab}>
            <TabsList className="bg-elysian-gray-dark border border-elysian-gold/20 mx-auto block w-fit">
              <TabsTrigger
                value="todos"
                className="data-[state=active]:bg-elysian-gold data-[state=active]:text-elysian-background"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="hombre"
                className="data-[state=active]:bg-elysian-gold data-[state=active]:text-elysian-background"
              >
                Hombre
              </TabsTrigger>
              <TabsTrigger
                value="mujer"
                className="data-[state=active]:bg-elysian-gold data-[state=active]:text-elysian-background"
              >
                Mujer
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 items-center max-w-3xl mx-auto">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elysian-gold h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar por nombre o colección..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold focus-visible:ring-elysian-gold/30 w-full"
              />
            </div>

            <div className="w-full md:w-72 space-y-2">
              <div className="flex justify-between">
                <Label
                  htmlFor="price-range"
                  className="text-sm text-elysian-white-soft/70"
                >
                  Rango de precio:
                </Label>
                <span className="text-sm text-elysian-gold">
                  {priceRange[0]}€ - {priceRange[1]}€
                </span>
              </div>
              <Slider
                id="price-range"
                min={minPrice}
                max={maxPrice}
                step={1} // Adjusted step for potentially finer control
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                className="[&>.SliderTrack]:bg-elysian-gold/30 [&>.SliderRange]:bg-elysian-gold [&>.SliderThumb]:border-elysian-gold"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="h-10 w-10 rounded-full border-4 border-elysian-gold/20 border-t-elysian-gold animate-spin"></div>
          </div>
        ) : (
          <div>
            {globalFilteredPerfumes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-elysian-white-soft text-lg">
                  No se encontraron perfumes con los filtros seleccionados.
                </p>
              </div>
            )}
            {collections.map((collection: Collection) => {
              const collectionPerfumes = globalFilteredPerfumes.filter(
                (p) => p.collection === collection.id
              );
              // Conditionally render collection section only if there are perfumes for it
              if (collectionPerfumes.length > 0) {
                return (
                  <section key={collection.id} className="mb-12">
                    <img
                      src={collection.logo}
                      alt={`${collection.name} logo`}
                      className="h-32 w-auto mb-4 mx-auto"
                    />
                    <PerfumeList perfumes={collectionPerfumes} />
                  </section>
                );
              }
              return null; // Don't render the collection section if no perfumes match
            })}
          </div>
        )}
      </Container>
    </main>
  );
}
