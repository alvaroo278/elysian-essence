export interface Perfume {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  gender: 'Hombre' | 'Mujer';
  featured?: boolean;
  rating?: number;
  notes?: string[];
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  isAdmin?: boolean;
}