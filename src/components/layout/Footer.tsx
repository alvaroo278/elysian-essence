import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-elysian-background border-t border-elysian-gold/20 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold gold-text">Elysian Essence</h3>
            <p className="text-elysian-white-soft/80 text-sm">
              Descubre la experiencia sensorial única de nuestros perfumes de
              lujo, creados con los ingredientes más selectos.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-elysian-gold hover:text-elysian-gold-light transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-elysian-gold hover:text-elysian-gold-light transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-elysian-gold hover:text-elysian-gold-light transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-elysian-gold font-medium mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-elysian-white-soft/80 hover:text-elysian-gold text-sm transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogo"
                  className="text-elysian-white-soft/80 hover:text-elysian-gold text-sm transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre-nosotros"
                  className="text-elysian-white-soft/80 hover:text-elysian-gold text-sm transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-elysian-white-soft/80 hover:text-elysian-gold text-sm transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-elysian-gold font-medium mb-4">Contacto</h4>
            <address className="not-italic">
              <p className="text-elysian-white-soft/80 text-sm mb-2">
                Calle Gran Vía, 123
                <br />
                28001 Madrid, España
              </p>
              <p className="text-elysian-white-soft/80 text-sm mb-2">
                <span className="text-elysian-gold">Tel:</span> +34 910 123 456
              </p>
              <p className="text-elysian-white-soft/80 text-sm">
                <span className="text-elysian-gold">Email:</span>{" "}
                info@elysianessence.com
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-elysian-gold/20 mt-8 pt-6 text-center text-elysian-white-soft/60 text-sm">
          <p>
            © {new Date().getFullYear()} Elysian Essence. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
