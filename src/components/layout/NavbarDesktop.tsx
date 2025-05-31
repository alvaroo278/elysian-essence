import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router-dom"; // Changed Link to NavLink
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function NavbarDesktop() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="py-3 bg-black/70 backdrop-blur-md sticky top-0 z-50"> {/* Updated nav style */}
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold gold-text">Elysian Essence</span>
        </Link>

        <div className="flex-grow flex justify-center">
          <div className="flex items-center space-x-6"> {/* Changed space-x-10 to space-x-6 */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-elysian-gold bg-white/5'
                    : 'text-elysian-white-soft hover:text-white hover:bg-white/5'
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/catalogo"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-elysian-gold bg-white/5'
                    : 'text-elysian-white-soft hover:text-white hover:bg-white/5'
                }`
              }
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/sobre-nosotros"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-elysian-gold bg-white/5'
                    : 'text-elysian-white-soft hover:text-white hover:bg-white/5'
                }`
              }
            >
              Sobre Nosotros
            </NavLink>
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-elysian-gold bg-white/5'
                    : 'text-elysian-white-soft hover:text-white hover:bg-white/5'
                }`
              }
            >
              Contacto
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4"> {/* User/Cart actions */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full h-10 w-10 hover:bg-white/10 flex items-center justify-center" // Updated User Dropdown Trigger
                >
                  <User className="h-5 w-5 text-elysian-gold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-elysian-gray-dark/90 backdrop-blur-sm border-white/10 text-elysian-white-soft" // Updated DropdownMenuContent
              >
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-elysian-gold/20" />
                <DropdownMenuItem className="hover:bg-elysian-gold/20"> {/* Updated hover style */}
                  <Link to="/perfil" className="w-full">
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-elysian-gold/20"> {/* Updated hover style */}
                  <Link to="/pedidos" className="w-full">
                    Mis Pedidos
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem className="hover:bg-elysian-gold/20"> {/* Updated hover style */}
                    <Link to="/admin" className="w-full">
                      Administración
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-elysian-gold/20" />
                <DropdownMenuItem
                  className="hover:bg-elysian-gold/20 cursor-pointer" // Updated hover style
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                className="border-elysian-gold text-elysian-gold hover:bg-elysian-gold hover:text-black px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-150" // Updated Login Button
              >
                Iniciar Sesión
              </Button>
            </Link>
          )}

          <Link to="/carrito">
            <Button variant="ghost" className="relative hover:bg-white/10 p-2 rounded-full"> {/* Updated Cart Button */}
              <ShoppingBag className="h-5 w-5 text-elysian-gold" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-elysian-gold text-elysian-background"> {/* Badge style remains same, seems fine */}
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
