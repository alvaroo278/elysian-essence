import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CartPage() {
  const { items, totalItems, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Container>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gold-text">
          Tu Carrito
        </h1>
        <p className="text-elysian-white-soft/80 max-w-2xl mx-auto">
          Revisa los productos que has seleccionado y procede al pago.
        </p>
      </div>

      {totalItems === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 max-w-md mx-auto"
        >
          <div className="bg-elysian-gray-dark p-8 rounded-lg border border-elysian-gold/20">
            <ShoppingBag className="h-16 w-16 text-elysian-gold/50 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-elysian-white-soft mb-2">Tu carrito está vacío</h2>
            <p className="text-elysian-white-soft/70 mb-6">
              Parece que aún no has añadido ningún producto a tu carrito.
            </p>
            <Button className="bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background">
              <Link to="/catalogo" className="flex items-center">
                Explorar catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-elysian-gray-dark rounded-lg p-6 border border-elysian-gold/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-elysian-white-soft">
                  Productos ({totalItems})
                </h2>
                <Button 
                  variant="ghost" 
                  className="text-elysian-gold hover:text-elysian-gold-light hover:bg-transparent"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>
              </div>
              
              <div className="divide-y divide-elysian-gold/20">
                {items.map((item) => (
                  <CartItem key={item.perfume.id} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </Container>
  );
}