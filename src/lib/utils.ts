import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

export const calculateTotal = (items: { price: number; quantity: number }[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};