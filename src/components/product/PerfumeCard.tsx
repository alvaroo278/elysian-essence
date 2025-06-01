import { Perfume } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface PerfumeCardProps {
  perfume: Perfume;
}

// Componente de Rating minimalista
function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 ${
            star <= rating
              ? "fill-elysian-gold text-elysian-gold"
              : "text-elysian-white-soft/30"
          }`}
        />
      ))}
      <span className="text-xs text-elysian-white-soft/70 ml-1 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function PerfumeCard({ perfume }: PerfumeCardProps) {
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(perfume, 1);
    toast({
      title: "Añadido al carrito",
      description: `${perfume.name} se ha añadido a tu carrito.`,
      duration: 3000,
    });
  };

  const handleCardClick = () => {
    navigate(`/perfume/${perfume.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-elysian-gold/30 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-elysian-gold/10"
      onClick={handleCardClick}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={perfume.image}
          alt={perfume.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge de destacado - Ley de Von Restorff */}
        {perfume.featured && (
          <div className="absolute top-3 left-3 bg-elysian-gold text-elysian-background px-2 py-1 text-xs font-semibold rounded-full">
            Destacado
          </div>
        )}

        {/* Botón de favorito - Ley de Fitts */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-elysian-gold text-elysian-gold" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Contenido del card - Aplicando Ley de Proximidad */}
      <div className="p-4 space-y-3">
        {/* Header con colección y rating */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-elysian-white-soft/60 uppercase tracking-wider font-medium">
            {perfume.collection}
          </span>
          {perfume.rating && <Rating rating={perfume.rating} />}
        </div>

        {/* Nombre del perfume - Ley de Miller (información jerárquica) */}
        <div>
          <h3 className="text-lg font-semibold text-elysian-white-soft group-hover:text-elysian-gold transition-colors duration-300 line-clamp-1">
            {perfume.name}
          </h3>
          <p className="text-xs text-elysian-white-soft/70 mt-1">
            {perfume.gender}
          </p>
        </div>

        {/* Precio - Ley de Prägnanz (simplicidad visual) */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-elysian-gold">
            {formatPrice(perfume.price)}
          </span>
        </div>

        {/* Botón de acción - Ley de Hick (una sola acción principal) */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-transparent border border-elysian-gold/30 text-elysian-gold hover:bg-elysian-gold hover:text-elysian-background transition-all duration-300 rounded-xl font-medium py-2.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
}
