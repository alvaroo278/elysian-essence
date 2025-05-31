import { Perfume } from './types';

export const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Nuit Mystique",
    brand: "Elysian",
    description: "Un aroma intenso y misterioso con notas de vainilla y pachulí.",
    price: 89.99,
    image: "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Mujer",
    featured: true,
    rating: 4.8,
    notes: ["Vainilla", "Pachulí", "Ámbar"]
  },
  {
    id: 2,
    name: "Océan Bleu",
    brand: "Elysian",
    description: "Frescura marina con toques cítricos y madera de cedro.",
    price: 78.50,
    image: "https://images.pexels.com/photos/755992/pexels-photo-755992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Hombre",
    featured: true,
    rating: 4.7,
    notes: ["Bergamota", "Cedro", "Sal Marina"]
  },
  {
    id: 3,
    name: "Rose Éternelle",
    brand: "Elysian",
    description: "Elegante composición floral con rosa damascena y jazmín.",
    price: 95.00,
    image: "https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Mujer",
    featured: true,
    rating: 4.9,
    notes: ["Rosa Damascena", "Jazmín", "Almizcle"]
  },
  {
    id: 4,
    name: "Bois Noir",
    brand: "Elysian",
    description: "Intenso y masculino con notas amaderadas y especiadas.",
    price: 85.00,
    image: "https://images.pexels.com/photos/3923162/pexels-photo-3923162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Hombre",
    featured: false,
    rating: 4.6,
    notes: ["Sándalo", "Pimienta Negra", "Oud"]
  },
  {
    id: 5,
    name: "Lumière Dorée",
    brand: "Elysian",
    description: "Radiante y luminoso con flores blancas y toques cítricos.",
    price: 92.00,
    image: "https://images.pexels.com/photos/3059610/pexels-photo-3059610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Mujer",
    featured: false,
    rating: 4.7,
    notes: ["Neroli", "Flor de Azahar", "Mandarina"]
  },
  {
    id: 6,
    name: "Ambre Royal",
    brand: "Elysian",
    description: "Opulento y cálido con ámbar, vainilla y especias exóticas.",
    price: 110.00,
    image: "https://images.pexels.com/photos/10828476/pexels-photo-10828476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Unisex",
    gender: "Hombre",
    featured: true,
    rating: 4.9,
    notes: ["Ámbar", "Vainilla", "Canela"]
  },
  {
    id: 7,
    name: "Jardin Secret",
    brand: "Elysian",
    description: "Un oasis verde con notas frescas y florales.",
    price: 88.00,
    image: "https://images.pexels.com/photos/3923165/pexels-photo-3923165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Mujer",
    featured: false,
    rating: 4.5,
    notes: ["Lirio", "Jazmín", "Musgo"]
  },
  {
    id: 8,
    name: "Cuir Sauvage",
    brand: "Elysian",
    description: "Intenso aroma a cuero con toques de especias y madera.",
    price: 98.50,
    image: "https://images.pexels.com/photos/3956298/pexels-photo-3956298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Hombre",
    featured: false,
    rating: 4.8,
    notes: ["Cuero", "Cardamomo", "Vetiver"]
  }
];