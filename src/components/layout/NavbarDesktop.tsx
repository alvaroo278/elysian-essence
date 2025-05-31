import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function NavbarDesktop() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="border-b border-elysian-gold/20 py-4 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold gold-text">Elysian Essence</span>
        </Link>

        <div className="flex items-center space-x-10">
          <Link to="/" className="text-elysian-white-soft hover:text-elysian-gold transition-colors">
            Inicio
          </Link>
          <Link to="/catalogo" className="text-elysian-white-soft hover:text-elysian-gold transition-colors">
            Catálogo
          </Link>
          <Link to="/sobre-nosotros" className="text-elysian-white-soft hover:text-elysian-gold transition-colors">
            Sobre Nosotros
          </Link>
          <Link to="/contacto" className="text-elysian-white-soft hover:text-elysian-gold transition-colors">
            Contacto
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost\" className="relative rounded-full h-10 w-10 border border-elysian-gold/30 hover:bg-elysian-gold/10">
                  <User className="h-5 w-5 text-elysian-gold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-elysian-gray-dark border-elysian-gold/30 text-elysian-white-soft">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-elysian-gold/20" />
                <DropdownMenuItem className="hover:bg-elysian-gold/10">
                  <Link to="/perfil" className="w-full">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-elysian-gold/10">
                  <Link to="/pedidos" className="w-full">Mis Pedidos</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem className="hover:bg-elysian-gold/10">
                    <Link to="/admin" className="w-full">Administración</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-elysian-gold/20" />
                <DropdownMenuItem 
                  className="hover:bg-elysian-gold/10 cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-elysian-gold text-elysian-gold hover:bg-elysian-gold hover:text-elysian-background">
                Iniciar Sesión
              </Button>
            </Link>
          )}
          
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
      </div>
    </nav>
  );
}