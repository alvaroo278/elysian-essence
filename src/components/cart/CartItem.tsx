import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { perfume, quantity } = item;

  const handleIncrease = () => {
    updateQuantity(perfume.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(perfume.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(perfume.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-elysian-gold/20 last:border-none gap-4">
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <img 
          src={perfume.image} 
          alt={perfume.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-elysian-white-soft">{perfume.name}</h3>
        <p className="text-sm text-elysian-white-soft/70">{perfume.brand} · {perfume.gender}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full border-elysian-gold/50 text-elysian-gold"
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-elysian-white-soft">{quantity}</span>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full border-elysian-gold/50 text-elysian-gold"
          onClick={handleIncrease}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="text-right w-24">
        <p className="font-medium text-elysian-gold">{formatPrice(perfume.price * quantity)}</p>
        <p className="text-xs text-elysian-white-soft/70">
          {quantity > 1 && `${formatPrice(perfume.price)} por unidad`}
        </p>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-elysian-white-soft/50 hover:text-elysian-gold hover:bg-transparent"
        onClick={handleRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}