import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Perfume } from '@/lib/types';
import { perfumes } from '@/lib/mockData';
import { PerfumeCard } from '@/components/product/PerfumeCard';
import { motion } from 'framer-motion';

export function FeaturedProducts() {
  const [featured, setFeatured] = useState<Perfume[]>([]);

  useEffect(() => {
    // Get featured perfumes from the mock data
    const featuredPerfumes = perfumes.filter(perfume => perfume.featured);
    setFeatured(featuredPerfumes);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16 bg-elysian-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">
            Fragancias Destacadas
          </h2>
          <p className="text-elysian-white-soft/80 max-w-2xl mx-auto">
            Nuestras creaciones más exclusivas, diseñadas para cautivar los sentidos y elevar cualquier ocasión.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featured.map((perfume) => (
            <motion.div key={perfume.id} variants={item}>
              <PerfumeCard perfume={perfume} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link 
            to="/catalogo"
            className="inline-block px-6 py-3 border border-elysian-gold text-elysian-gold hover:bg-elysian-gold hover:text-elysian-background transition duration-300 rounded"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </div>
    </section>
  );
}