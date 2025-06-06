import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Perfume, Collection } from "@/lib/types";
import { perfumes as mockPerfumes, collections } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ShoppingBag, Plus, Minus, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading from API
    const timer = setTimeout(() => {
      if (id) {
        const foundPerfume = mockPerfumes.find((p) => p.id === parseInt(id));
        setPerfume(foundPerfume || null);

        // Buscar la información de la colección
        if (foundPerfume) {
          const foundCollection = collections.find((c) => c.id === foundPerfume.collection);
          setCollection(foundCollection || null);
        }
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
        title: "¡Añadido al carrito!",
        description: `${quantity} x ${perfume.name} se ha añadido a tu carrito.`,
        duration: 3000,
      });
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: isWishlisted
        ? "El producto se ha eliminado de tu lista de deseos"
        : "El producto se ha añadido a tu lista de deseos",
      duration: 2000,
    });
  };

  if (loading) {
    return (
      <Container className="flex justify-center items-center min-h-[60vh]">
        <div className="h-12 w-12 rounded-full border-4 border-elysian-gold/20 border-t-elysian-gold animate-spin"></div>
      </Container>
    );
  }

  if (!perfume) {
    return (
      <Container className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-elysian-white-soft mb-4">
            Perfume no encontrado
          </h1>
          <p className="text-elysian-white-soft/80 mb-8 max-w-md mx-auto">
            El perfume que estás buscando no existe o ha sido eliminado.
          </p>
          <Button className="bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background">
            <Link to="/catalogo">Volver al catálogo</Link>
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container className="py-6">
      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Link
          to="/catalogo"
          className="text-elysian-white-soft/70 hover:text-elysian-gold inline-flex items-center transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </Link>
      </motion.div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <div className="w-full max-w-md lg:max-w-sm xl:max-w-md aspect-[3/4] overflow-hidden rounded-2xl border border-elysian-gold/20 shadow-2xl bg-gradient-to-br from-elysian-gold/5 to-transparent">
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Image overlay for premium feel */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Product Information */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col space-y-4 lg:space-y-3"
        >
          {/* Header Section */}
          <div className="space-y-3 lg:space-y-2">
            <div className="flex items-center">
              <Badge className="bg-elysian-gold/20 text-elysian-gold hover:bg-elysian-gold/30 px-3 py-1">
                {perfume.gender}
              </Badge>
            </div>

            <h1 className="text-3xl lg:text-2xl xl:text-3xl font-bold text-elysian-white-soft leading-tight">
              {perfume.name}
            </h1>

            <div className="flex items-baseline space-x-2">
              <p className="text-2xl lg:text-xl xl:text-2xl font-bold text-elysian-gold">
                {formatPrice(perfume.price)}
              </p>
              <span className="text-elysian-white-soft/60 text-sm">IVA incluido</span>
            </div>

            {collection && (
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-elysian-white-soft/70">De la colección:</span>
                <div className="bg-elysian-gold/10 border border-elysian-gold/30 rounded-lg px-3 py-2">
                  <span className="font-medium text-elysian-white-soft">{collection.name}</span>
                </div>
              </div>
            )}
          </div>

          <Separator className="bg-elysian-gold/20" />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg lg:text-base xl:text-lg font-semibold text-elysian-white-soft">
              Descripción
            </h3>
            <p className="text-elysian-white-soft/80 leading-relaxed text-sm lg:text-xs xl:text-sm line-clamp-3 lg:line-clamp-2 xl:line-clamp-3">
              {perfume.description}
            </p>
          </div>

          {/* Notes */}
          {perfume.notes && perfume.notes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg lg:text-base xl:text-lg font-semibold text-elysian-white-soft">
                Notas aromáticas
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {perfume.notes.slice(0, 6).map((note, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-elysian-gold/40 text-elysian-white-soft/90 hover:bg-elysian-gold/10 transition-colors px-2 py-0.5 text-xs"
                  >
                    {note}
                  </Badge>
                ))}
                {perfume.notes.length > 6 && (
                  <Badge
                    variant="outline"
                    className="border-elysian-gold/40 text-elysian-white-soft/70 px-2 py-0.5 text-xs"
                  >
                    +{perfume.notes.length - 6} más
                  </Badge>
                )}
              </div>
            </div>
          )}

          <Separator className="bg-elysian-gold/20" />

          {/* Purchase Section */}
          <div className="space-y-4 lg:space-y-3">
            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-elysian-white-soft">
                Cantidad
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-elysian-gold/50 rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 text-elysian-gold hover:bg-elysian-gold/10 rounded-none"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-9 w-14 flex items-center justify-center text-elysian-white-soft font-medium bg-elysian-gold/5 text-sm">
                    {quantity}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 text-elysian-gold hover:bg-elysian-gold/10 rounded-none"
                    onClick={handleIncreaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-elysian-white-soft/70">
                  Total: <span className="font-semibold text-elysian-gold">
                    {formatPrice(perfume.price * quantity)}
                  </span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <Button
                className="bg-gradient-to-r from-elysian-gold to-elysian-gold-light hover:from-elysian-gold-light hover:to-elysian-gold text-elysian-background flex-1 h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Añadir al carrito
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`border-elysian-gold/50 h-11 w-11 transition-all duration-300 ${isWishlisted
                  ? 'bg-elysian-gold/20 text-elysian-gold border-elysian-gold'
                  : 'text-elysian-gold hover:bg-elysian-gold/10'
                  }`}
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>


    </Container>
  );
}
