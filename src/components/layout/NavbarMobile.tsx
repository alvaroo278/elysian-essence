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
    <nav className="py-4 bg-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="grid grid-cols-3 items-center">
          {/* Sección izquierda - Menú hamburguesa */}
          <div className="flex justify-start">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-elysian-gold hover:bg-white/10">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-black/95 backdrop-blur-md border-r border-white/10 text-elysian-white-soft"
              >
                <SheetHeader>
                  <SheetTitle className="text-elysian-gold">Menú</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-2">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center py-3 px-3 w-full rounded-md text-base ${isActive
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
                      `flex items-center py-3 px-3 w-full rounded-md text-base ${isActive
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
                    to="/contacto"
                    className={({ isActive }) =>
                      `flex items-center py-3 px-3 w-full rounded-md text-base ${isActive
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
                          `flex items-center py-3 px-3 w-full rounded-md text-base ${isActive
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
                          `flex items-center py-3 px-3 w-full rounded-md text-base ${isActive
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
                            `flex items-center py-3 px-3 w-full rounded-md text-base ${isActive
                              ? "text-elysian-gold bg-white/5"
                              : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                            }`
                          }
                          onClick={closeMenu}
                        >
                          <span className="mr-3 text-elysian-gold">⚙️</span>
                          <span>Administración</span>
                        </NavLink>
                      )}
                      <button
                        className="flex items-center py-3 px-3 w-full rounded-md text-base text-elysian-white-soft hover:text-white hover:bg-white/5 text-left"
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
                        `flex items-center py-3 px-3 w-full rounded-md text-base ${isActive
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
          </div>

          {/* Sección central - Logo */}
          <div className="flex justify-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo2.png"
                alt="Elysian Essence - Perfumes de Lujo"
                className="h-10 w-auto object-contain transition-all duration-300 hover:scale-105 filter drop-shadow-lg"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Sección derecha - Carrito */}
          <div className="flex justify-end">
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
        </div>
      </div>
    </nav>
  );
}
