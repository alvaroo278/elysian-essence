import { Perfume } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface PerfumeCardProps {
  perfume: Perfume;
}

export function PerfumeCard({ perfume }: PerfumeCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addItem(perfume, 1);
    toast({
      title: 'Añadido al carrito',
      description: `${perfume.name} se ha añadido a tu carrito.`,
      duration: 3000,
    });
  };

  return (
    <div 
      className="card-product h-full flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img 
          src={perfume.image} 
          alt={perfume.name}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-elysian-background/30 backdrop-blur-sm hover:bg-elysian-gold/30"
          >
            <Heart className="h-5 w-5 text-elysian-white-soft hover:text-elysian-gold" />
          </Button>
        </div>
        
        {perfume.featured && (
          <div className="absolute top-3 left-3 bg-elysian-gold px-2 py-1 text-xs font-medium text-elysian-background rounded">
            Destacado
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col">
          <span className="text-sm text-elysian-white-soft/70 mb-1">
            {perfume.brand}
          </span>
          <Link to={`/perfume/${perfume.id}`} className="text-lg font-semibold text-elysian-white-soft hover:text-elysian-gold transition-colors">
            {perfume.name}
          </Link>
          <div className="flex justify-between items-center mt-2">
            <span className="text-elysian-gold font-medium">
              {formatPrice(perfume.price)}
            </span>
            <span className="text-xs text-elysian-white-soft/70">
              {perfume.gender}
            </span>
          </div>
        </div>
      </div>
      
      <Button 
        className="mt-auto m-4 bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background"
        onClick={handleAddToCart}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Añadir al carrito
      </Button>
    </div>
  );
}