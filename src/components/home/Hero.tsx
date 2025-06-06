import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>

      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2108&q=80')] bg-cover bg-center"
        style={{
          opacity: 0.5,
        }}
      ></div>

      <div className="container-custom relative z-20 h-full flex items-center">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 gold-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Descubre la esencia de lo extraordinario
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-elysian-white-soft mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fragancias exclusivas que capturan la esencia de tus momentos más
            especiales. Una experiencia sensorial única creada con los
            ingredientes más selectos.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button className="bg-elysian-gold text-elysian-background hover:bg-elysian-gold-light">
              <Link to="/catalogo">Explorar Catálogo</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
