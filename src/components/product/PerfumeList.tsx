import { useState, useEffect } from "react";
import { Perfume } from "@/lib/types";
import { PerfumeCard } from "./PerfumeCard";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface PerfumeListProps {
  perfumes: Perfume[];
}

export function PerfumeList({ perfumes }: PerfumeListProps) {
  const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>(perfumes);
  const [activeTab, setActiveTab] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Get min and max prices from perfumes
  const minPrice = 0;
  const maxPrice = Math.max(...perfumes.map((p) => p.price)) + 10;

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    let result = [...perfumes];

    // Filter by gender tab
    if (activeTab !== "todos") {
      result = result.filter((perfume) =>
        activeTab === "hombre"
          ? perfume.gender === "Hombre"
          : perfume.gender === "Mujer"
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (perfume) =>
          perfume.name.toLowerCase().includes(query) ||
          perfume.collection.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    result = result.filter(
      (perfume) =>
        perfume.price >= priceRange[0] && perfume.price <= priceRange[1]
    );

    setFilteredPerfumes(result);
  }, [perfumes, activeTab, searchQuery, priceRange]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <div className="mb-8 space-y-6">
        <Tabs defaultValue="todos" onValueChange={handleTabChange}>
          <TabsList className="bg-elysian-gray-dark border border-elysian-gold/20">
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

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elysian-gold h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar perfumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold focus-visible:ring-elysian-gold/30"
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
              defaultValue={[minPrice, maxPrice]}
              min={minPrice}
              max={maxPrice}
              step={5}
              value={priceRange}
              onValueChange={setPriceRange}
              className="[&>.SliderTrack]:bg-elysian-gold/30 [&>.SliderRange]:bg-elysian-gold [&>.SliderThumb]:border-elysian-gold"
            />
          </div>
        </div>
      </div>

      {filteredPerfumes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-elysian-white-soft">
            No se encontraron perfumes con los filtros seleccionados.
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredPerfumes.map((perfume) => (
            <motion.div key={perfume.id} variants={item}>
              <PerfumeCard perfume={perfume} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
