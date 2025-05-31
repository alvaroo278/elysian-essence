import { Container } from "@/components/ui/container";

export function AboutUsPage() {
  return (
    <main>
      <Container>
        <div className="py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gold-text">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-elysian-white-soft/80 max-w-3xl mx-auto leading-relaxed">
              Somos una empresa dedicada a crear experiencias olfativas únicas,
              combinando tradición artesanal con innovación moderna.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 gold-text">
                Nuestra Historia
              </h2>
              <p className="text-elysian-white-soft/80 mb-4 leading-relaxed">
                Fundada con la pasión por las fragancias excepcionales, nuestra
                empresa nació del deseo de crear perfumes que cuenten historias
                y despierten emociones. Cada fragancia es el resultado de años
                de investigación y dedicación.
              </p>
              <p className="text-elysian-white-soft/80 leading-relaxed">
                Trabajamos con los mejores perfumistas y utilizamos ingredientes
                de la más alta calidad, seleccionados cuidadosamente de todo el
                mundo para garantizar la excelencia en cada gota.
              </p>
            </div>
            <div className="bg-gradient-to-br from-elysian-gold/10 to-elysian-gold/5 p-8 rounded-lg">
              <div className="text-center">
                <div className="w-24 h-24 bg-elysian-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌸</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 gold-text">
                  Artesanía
                </h3>
                <p className="text-elysian-white-soft/70">
                  Cada perfume es creado a mano con técnicas tradicionales
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 gold-text">
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-elysian-gold/10 to-elysian-gold/5 rounded-lg">
                <div className="w-16 h-16 bg-elysian-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 gold-text">
                  Calidad
                </h3>
                <p className="text-elysian-white-soft/70">
                  Utilizamos únicamente ingredientes premium y procesos de
                  calidad superior
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-elysian-gold/10 to-elysian-gold/5 rounded-lg">
                <div className="w-16 h-16 bg-elysian-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 gold-text">
                  Sostenibilidad
                </h3>
                <p className="text-elysian-white-soft/70">
                  Comprometidos con prácticas responsables y respeto por el
                  medio ambiente
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-elysian-gold/10 to-elysian-gold/5 rounded-lg">
                <div className="w-16 h-16 bg-elysian-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 gold-text">
                  Exclusividad
                </h3>
                <p className="text-elysian-white-soft/70">
                  Creamos fragancias únicas y limitadas para experiencias
                  irrepetibles
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="text-center bg-gradient-to-r from-elysian-gold/10 via-elysian-gold/5 to-elysian-gold/10 p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 gold-text">
              Nuestra Misión
            </h2>
            <p className="text-xl text-elysian-white-soft/80 max-w-4xl mx-auto leading-relaxed">
              Crear fragancias excepcionales que transporten a nuestros clientes
              a mundos de elegancia y sofisticación, donde cada aroma cuenta una
              historia única y despierta los sentidos más profundos.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
