import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CartSummary() {
  const { totalItems, totalPrice } = useCart();
  
  const shippingCost = totalPrice > 100 ? 0 : 5.99;
  const total = totalPrice + shippingCost;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-elysian-gray-dark rounded-lg p-6 border border-elysian-gold/20"
    >
      <h3 className="text-xl font-semibold text-elysian-white-soft mb-4">Resumen del pedido</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-elysian-white-soft/80">
          <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        
        <div className="flex justify-between text-elysian-white-soft/80">
          <span>Envío</span>
          <span>
            {shippingCost === 0 
              ? <span className="text-green-500">Gratis</span> 
              : formatPrice(shippingCost)
            }
          </span>
        </div>
        
        {shippingCost === 0 && (
          <div className="text-xs text-green-500 italic">
            Envío gratuito en pedidos superiores a 100€
          </div>
        )}
        
        <div className="border-t border-elysian-gold/20 pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span className="text-elysian-white-soft">Total</span>
            <span className="text-elysian-gold">{formatPrice(total)}</span>
          </div>
          <div className="text-xs text-elysian-white-soft/70 mt-1">
            Impuestos incluidos
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background"
      >
        <Link to="/checkout" className="w-full">
          Proceder al pago
        </Link>
      </Button>
      
      <div className="mt-4 text-center">
        <Link 
          to="/catalogo" 
          className="text-sm text-elysian-gold hover:underline"
        >
          Continuar comprando
        </Link>
      </div>
    </motion.div>
  );
}