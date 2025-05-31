import { motion } from 'framer-motion';
import { Zap, Heart, Award, Truck } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-10 w-10 text-elysian-gold" />,
    title: "Fragancias Exclusivas",
    description: "Creaciones únicas elaboradas por maestros perfumistas con ingredientes de la más alta calidad."
  },
  {
    icon: <Heart className="h-10 w-10 text-elysian-gold" />,
    title: "Experiencia Sensorial",
    description: "Aromas cuidadosamente diseñados para evocar emociones y crear momentos inolvidables."
  },
  {
    icon: <Award className="h-10 w-10 text-elysian-gold" />,
    title: "Calidad Premium",
    description: "Compromiso con la excelencia en cada detalle, desde la elaboración hasta el packaging."
  },
  {
    icon: <Truck className="h-10 w-10 text-elysian-gold" />,
    title: "Envío Internacional",
    description: "Hacemos llegar nuestra exclusiva colección a cualquier parte del mundo."
  }
];

export function Features() {
  return (
    <section className="py-16 bg-elysian-gray-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">
            Por qué elegirnos
          </h2>
          <p className="text-elysian-white-soft/80 max-w-2xl mx-auto">
            En Elysian Essence nos dedicamos a crear experiencias sensoriales excepcionales a través de fragancias sofisticadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-elysian-background p-6 rounded-lg border border-elysian-gold/20 flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-elysian-gold">
                {feature.title}
              </h3>
              <p className="text-elysian-white-soft/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}