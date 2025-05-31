import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Perfume } from "@/lib/types";
import { perfumes as mockPerfumes } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ShoppingBag, Plus, Minus, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();
  useEffect(() => {
    // Simulate loading from API
    const timer = setTimeout(() => {
      if (id) {
        const foundPerfume = mockPerfumes.find((p) => p.id === parseInt(id));
        setPerfume(foundPerfume || null);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (perfume) {
      addItem(perfume, quantity);
      toast({
        title: "Añadido al carrito",
        description: `${quantity} x ${perfume.name} se ha añadido a tu carrito.`,
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Container className="flex justify-center items-center min-h-[60vh]">
        <div className="h-10 w-10 rounded-full border-4 border-elysian-gold/20 border-t-elysian-gold animate-spin"></div>
      </Container>
    );
  }

  if (!perfume) {
    return (
      <Container className="text-center py-16">
        <h1 className="text-2xl font-bold text-elysian-white-soft mb-4">
          Perfume no encontrado
        </h1>
        <p className="text-elysian-white-soft/80 mb-8">
          El perfume que estás buscando no existe o ha sido eliminado.
        </p>
        <Button className="bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background">
          <Link to="/catalogo">Volver al catálogo</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-8">
        <Link
          to="/catalogo"
          className="text-elysian-white-soft/70 hover:text-elysian-gold inline-flex items-center transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver al catálogo
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-[3/4] overflow-hidden rounded-lg border border-elysian-gold/20"
        >
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-elysian-gold/20 text-elysian-gold hover:bg-elysian-gold/30">
                {perfume.gender}
              </Badge>
              {perfume.featured && (
                <Badge className="bg-elysian-gold text-elysian-background">
                  Destacado
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold text-elysian-white-soft">
              {perfume.name}
            </h1>

            <p className="text-lg font-medium text-elysian-gold">
              {formatPrice(perfume.price)}
            </p>

            <div className="flex items-center">
              <span className="text-elysian-white-soft/70 text-sm mr-2">
                Marca:
              </span>
              <span className="text-elysian-white-soft">{perfume.brand}</span>
            </div>

            <Separator className="bg-elysian-gold/20 my-2" />

            <div>
              <h3 className="text-lg font-medium text-elysian-white-soft mb-2">
                Descripción
              </h3>
              <p className="text-elysian-white-soft/80">
                {perfume.description}
              </p>
            </div>

            {perfume.notes && perfume.notes.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-elysian-white-soft mb-2">
                  Notas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {perfume.notes.map((note, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-elysian-gold/40 text-elysian-white-soft/90"
                    >
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-elysian-gold/20 my-2" />

            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-md rounded-r-none border-elysian-gold/50 text-elysian-gold h-10"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="h-10 w-12 flex items-center justify-center border-t border-b border-elysian-gold/50 text-elysian-white-soft">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-md rounded-l-none border-elysian-gold/50 text-elysian-gold h-10"
                  onClick={handleIncreaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                className="bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Añadir al carrito
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="border-elysian-gold/50 text-elysian-gold hover:bg-elysian-gold/10"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
