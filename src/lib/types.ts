export type CollectionId =
  | "lattafa"
  | "armaf"
  | "swiss-arabian"
  | "french-avenue"
  | "emper"
  | "camara-perfumes";

export interface Collection {
  id: CollectionId;
  name: string;
  logo: string;
}

export interface Perfume {
  id: number;
  name: string;
  collection: CollectionId;
  description: string;
  price: number;
  image: string;
  gender: "Hombre" | "Mujer" | "Unisex";
  featured?: boolean;
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
