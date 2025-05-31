import { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Changed Link to NavLink
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  User,
  Menu,
  LogOut,
  Home,
  Book,
  Info,
  Mail,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function NavbarMobile() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="py-3 bg-black/70 backdrop-blur-md sticky top-0 z-50">
      {" "}
      {/* Updated nav style */}
      <div className="container-custom flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-elysian-gold">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-black/80 backdrop-blur-md border-r border-white/10 text-elysian-white-soft" // Updated SheetContent style
          >
            <SheetHeader>
              <SheetTitle className="text-elysian-gold">Menú</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col space-y-2">
              {" "}
              {/* Reduced space-y for tighter packing with new padding */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center py-3 px-3 w-full rounded-md text-base ${
                    isActive
                      ? "text-elysian-gold bg-white/5"
                      : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                  }`
                }
                onClick={closeMenu}
              >
                <Home className="mr-3 h-5 w-5 text-elysian-gold" />
                <span>Inicio</span>
              </NavLink>
              <NavLink
                to="/catalogo"
                className={({ isActive }) =>
                  `flex items-center py-3 px-3 w-full rounded-md text-base ${
                    isActive
                      ? "text-elysian-gold bg-white/5"
                      : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                  }`
                }
                onClick={closeMenu}
              >
                <Book className="mr-3 h-5 w-5 text-elysian-gold" />
                <span>Catálogo</span>
              </NavLink>
              <NavLink
                to="/sobre-nosotros"
                className={({ isActive }) =>
                  `flex items-center py-3 px-3 w-full rounded-md text-base ${
                    isActive
                      ? "text-elysian-gold bg-white/5"
                      : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                  }`
                }
                onClick={closeMenu}
              >
                <Info className="mr-3 h-5 w-5 text-elysian-gold" />
                <span>Sobre Nosotros</span>
              </NavLink>
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  `flex items-center py-3 px-3 w-full rounded-md text-base ${
                    isActive
                      ? "text-elysian-gold bg-white/5"
                      : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                  }`
                }
                onClick={closeMenu}
              >
                <Mail className="mr-3 h-5 w-5 text-elysian-gold" />
                <span>Contacto</span>
              </NavLink>
              <Separator className="bg-elysian-gold/20 my-2" />
              {user ? (
                <>
                  <NavLink
                    to="/perfil"
                    className={({ isActive }) =>
                      `flex items-center py-3 px-3 w-full rounded-md text-base ${
                        isActive
                          ? "text-elysian-gold bg-white/5"
                          : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                      }`
                    }
                    onClick={closeMenu}
                  >
                    <User className="mr-3 h-5 w-5 text-elysian-gold" />
                    <span>Mi Perfil</span>
                  </NavLink>
                  <NavLink
                    to="/pedidos"
                    className={({ isActive }) =>
                      `flex items-center py-3 px-3 w-full rounded-md text-base ${
                        isActive
                          ? "text-elysian-gold bg-white/5"
                          : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                      }`
                    }
                    onClick={closeMenu}
                  >
                    <ShoppingBag className="mr-3 h-5 w-5 text-elysian-gold" />
                    <span>Mis Pedidos</span>
                  </NavLink>
                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `flex items-center py-3 px-3 w-full rounded-md text-base ${
                          isActive
                            ? "text-elysian-gold bg-white/5"
                            : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                        }`
                      }
                      onClick={closeMenu}
                    >
                      <span className="mr-3 text-elysian-gold">⚙️</span>{" "}
                      {/* Adjusted mr for consistency */}
                      <span>Administración</span>
                    </NavLink>
                  )}
                  <button
                    className="flex items-center py-3 px-3 w-full rounded-md text-base text-elysian-white-soft hover:text-white hover:bg-white/5 text-left" // Updated button style
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    <LogOut className="mr-3 h-5 w-5 text-elysian-gold" />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center py-3 px-3 w-full rounded-md text-base ${
                      isActive
                        ? "text-elysian-gold bg-white/5"
                        : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                    }`
                  }
                  onClick={closeMenu}
                >
                  <User className="mr-3 h-5 w-5 text-elysian-gold" />
                  <span>Iniciar Sesión</span>
                </NavLink>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold gold-text">Elysian Essence</span>
        </Link>

        <Link to="/carrito">
          <Button
            variant="ghost"
            className="relative hover:bg-white/10 p-2 rounded-full"
          >
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
