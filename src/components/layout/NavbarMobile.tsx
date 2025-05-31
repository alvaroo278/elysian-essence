import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User, Menu, X, LogOut, Home, Book, Info, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function NavbarMobile() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="border-b border-elysian-gold/20 py-4 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-elysian-gold">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-elysian-gray-dark border-r border-elysian-gold/20 text-elysian-white-soft">
            <SheetHeader>
              <SheetTitle className="text-elysian-gold">Menú</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col space-y-4">
              <Link to="/" className="flex items-center py-2" onClick={closeMenu}>
                <Home className="mr-2 h-5 w-5 text-elysian-gold" />
                <span>Inicio</span>
              </Link>
              <Link to="/catalogo" className="flex items-center py-2" onClick={closeMenu}>
                <Book className="mr-2 h-5 w-5 text-elysian-gold" />
                <span>Catálogo</span>
              </Link>
              <Link to="/sobre-nosotros" className="flex items-center py-2" onClick={closeMenu}>
                <Info className="mr-2 h-5 w-5 text-elysian-gold" />
                <span>Sobre Nosotros</span>
              </Link>
              <Link to="/contacto" className="flex items-center py-2" onClick={closeMenu}>
                <Mail className="mr-2 h-5 w-5 text-elysian-gold" />
                <span>Contacto</span>
              </Link>
              
              <Separator className="bg-elysian-gold/20 my-2" />
              
              {user ? (
                <>
                  <Link to="/perfil\" className="flex items-center py-2\" onClick={closeMenu}>
                    <User className="mr-2 h-5 w-5 text-elysian-gold" />
                    <span>Mi Perfil</span>
                  </Link>
                  <Link to="/pedidos" className="flex items-center py-2" onClick={closeMenu}>
                    <ShoppingBag className="mr-2 h-5 w-5 text-elysian-gold" />
                    <span>Mis Pedidos</span>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center py-2" onClick={closeMenu}>
                      <span className="mr-2 text-elysian-gold">⚙️</span>
                      <span>Administración</span>
                    </Link>
                  )}
                  <button 
                    className="flex items-center py-2 text-left w-full"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    <LogOut className="mr-2 h-5 w-5 text-elysian-gold" />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center py-2"
                  onClick={closeMenu}
                >
                  <User className="mr-2 h-5 w-5 text-elysian-gold" />
                  <span>Iniciar Sesión</span>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold gold-text">Elysian Essence</span>
        </Link>

        <Link to="/carrito">
          <Button variant="ghost" className="relative">
            <ShoppingBag className="h-5 w-5 text-elysian-gold" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-elysian-gold text-elysian-background">
                {totalItems}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
}