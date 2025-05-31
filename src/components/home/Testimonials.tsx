import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "María González",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Descubrí Elysian Essence hace un año y desde entonces se ha convertido en mi firma personal. La calidad y duración de sus fragancias es incomparable.",
    perfume: "Nuit Mystique",
    rating: 5
  },
  {
    name: "Carlos Martínez",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Como coleccionista de perfumes, puedo asegurar que la calidad de Elysian Essence está a la altura de las grandes casas perfumeras. Excepcional.",
    perfume: "Océan Bleu",
    rating: 5
  },
  {
    name: "Laura Sánchez",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Mi experiencia con Elysian Essence ha sido extraordinaria. Sus fragancias son elegantes, sofisticadas y recibo cumplidos constantemente.",
    perfume: "Rose Éternelle",
    rating: 4
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-elysian-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-elysian-white-soft/80 max-w-2xl mx-auto">
            Experiencias reales de quienes han descubierto el mundo de sensaciones de Elysian Essence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-elysian-gray-dark p-6 rounded-lg border border-elysian-gold/20"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-elysian-gold"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-elysian-white-soft">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-elysian-gold">
                    {testimonial.perfume}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-elysian-gold fill-elysian-gold' : 'text-elysian-white-soft/20'}`} 
                  />
                ))}
              </div>
              
              <p className="text-elysian-white-soft/80 italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}