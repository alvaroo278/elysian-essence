import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, LogOut, ChevronDown } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { collections, perfumes } from "@/lib/mockData";
import { useState } from "react";

export function NavbarDesktop() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [hoveredGender, setHoveredGender] = useState<string | null>(null);

  // Obtener colecciones que tienen productos para cada género
  const getCollectionsForGender = (gender: "Hombre" | "Mujer") => {
    const genderCollections = new Set();
    perfumes
      .filter((perfume) => perfume.gender === gender)
      .forEach((perfume) => genderCollections.add(perfume.collection));

    return collections.filter((collection) =>
      genderCollections.has(collection.id)
    );
  };

  const menCollections = getCollectionsForGender("Hombre");
  const womenCollections = getCollectionsForGender("Mujer");

  const handleCollectionClick = (
    collectionId: string,
    gender: "Hombre" | "Mujer"
  ) => {
    navigate(`/catalogo?gender=${gender}&collection=${collectionId}`);
  };

  const handleGenderClick = (gender: "Hombre" | "Mujer") => {
    navigate(`/catalogo?gender=${gender}`);
  };

  return (
    <nav className="py-4 bg-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="grid grid-cols-3 items-center">
          {/* Sección izquierda - Menús de navegación */}
          <div className="flex items-center justify-start space-x-4 -ml-1">
            {/* Menú desplegable para Él */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredGender("Hombre")}
              onMouseLeave={() => setHoveredGender(null)}
            >
              <button
                onClick={() => handleGenderClick("Hombre")}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 text-elysian-white-soft hover:text-white hover:bg-white/5 group-hover:text-elysian-gold"
              >
                Él
                <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu para Él */}
              <div
                className={`absolute top-full left-0 mt-1 w-64 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl transition-all duration-200 ${hoveredGender === "Hombre"
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
                  }`}
              >
                <div className="p-3">
                  <div className="text-xs text-elysian-gold font-semibold mb-2 uppercase tracking-wider">
                    Colecciones para Él
                  </div>
                  <div className="space-y-1">
                    {menCollections.map((collection) => (
                      <button
                        key={collection.id}
                        onClick={() =>
                          handleCollectionClick(collection.id, "Hombre")
                        }
                        className="w-full text-left px-3 py-2 text-sm text-elysian-white-soft hover:text-white hover:bg-elysian-gold/20 rounded-md transition-all duration-150 flex items-center group/item"
                      >
                        <div className="w-6 h-6 mr-3 bg-white/10 rounded-md flex items-center justify-center overflow-hidden group-hover/item:bg-white/20 transition-all duration-150">
                          <img
                            src={collection.logo}
                            alt={`${collection.name} logo`}
                            className="w-4 h-4 object-contain filter brightness-0 invert opacity-80 group-hover/item:opacity-100 transition-opacity duration-150"
                            onError={(e) => {
                              // Fallback si la imagen no carga
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-bold text-elysian-gold">${collection.name.charAt(
                                  0
                                )}</span>`;
                              }
                            }}
                          />
                        </div>
                        <span className="font-medium">{collection.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handleGenderClick("Hombre")}
                      className="w-full text-center px-3 py-2 text-sm text-elysian-gold hover:bg-elysian-gold/20 rounded-md transition-all duration-150 font-medium"
                    >
                      Ver todo para Él →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Menú desplegable para Ella */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredGender("Mujer")}
              onMouseLeave={() => setHoveredGender(null)}
            >
              <button
                onClick={() => handleGenderClick("Mujer")}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 text-elysian-white-soft hover:text-white hover:bg-white/5 group-hover:text-elysian-gold"
              >
                Ella
                <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu para Ella */}
              <div
                className={`absolute top-full left-0 mt-1 w-64 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl transition-all duration-200 ${hoveredGender === "Mujer"
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
                  }`}
              >
                <div className="p-3">
                  <div className="text-xs text-elysian-gold font-semibold mb-2 uppercase tracking-wider">
                    Colecciones para Ella
                  </div>
                  <div className="space-y-1">
                    {womenCollections.map((collection) => (
                      <button
                        key={collection.id}
                        onClick={() =>
                          handleCollectionClick(collection.id, "Mujer")
                        }
                        className="w-full text-left px-3 py-2 text-sm text-elysian-white-soft hover:text-white hover:bg-elysian-gold/20 rounded-md transition-all duration-150 flex items-center group/item"
                      >
                        <div className="w-6 h-6 mr-3 bg-white/10 rounded-md flex items-center justify-center overflow-hidden group-hover/item:bg-white/20 transition-all duration-150">
                          <img
                            src={collection.logo}
                            alt={`${collection.name} logo`}
                            className="w-4 h-4 object-contain filter brightness-0 invert opacity-80 group-hover/item:opacity-100 transition-opacity duration-150"
                            onError={(e) => {
                              // Fallback si la imagen no carga
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-bold text-elysian-gold">${collection.name.charAt(
                                  0
                                )}</span>`;
                              }
                            }}
                          />
                        </div>
                        <span className="font-medium">{collection.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handleGenderClick("Mujer")}
                      className="w-full text-center px-3 py-2 text-sm text-elysian-gold hover:bg-elysian-gold/20 rounded-md transition-all duration-150 font-medium"
                    >
                      Ver todo para Ella →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <NavLink
              to="/catalogo"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${isActive
                  ? "text-elysian-gold bg-white/5"
                  : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                }`
              }
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/sobre-nosotros"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${isActive
                  ? "text-elysian-gold bg-white/5"
                  : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                }`
              }
            >
              Sobre Nosotros
            </NavLink>
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${isActive
                  ? "text-elysian-gold bg-white/5"
                  : "text-elysian-white-soft hover:text-white hover:bg-white/5"
                }`
              }
            >
              Contacto
            </NavLink>
          </div>

          {/* Sección central - Logo */}
          <div className="flex justify-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold gold-text">Elysian Essence</span>
            </Link>
          </div>

          {/* Sección derecha - Usuario y Carrito */}
          <div className="flex items-center justify-end space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full h-10 w-10 hover:bg-white/10 flex items-center justify-center"
                  >
                    <User className="h-5 w-5 text-elysian-gold" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-elysian-gray-dark/90 backdrop-blur-sm border-white/10 text-elysian-white-soft"
                >
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-elysian-gold/20" />
                  <DropdownMenuItem className="hover:bg-elysian-gold/20">
                    <Link to="/perfil" className="w-full">
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-elysian-gold/20">
                    <Link to="/pedidos" className="w-full">
                      Mis Pedidos
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem className="hover:bg-elysian-gold/20">
                      <Link to="/admin" className="w-full">
                        Administración
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-elysian-gold/20" />
                  <DropdownMenuItem
                    className="hover:bg-elysian-gold/20 cursor-pointer"
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
                  className="border-elysian-gold text-elysian-gold hover:bg-elysian-gold hover:text-black px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-150"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            )}
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
