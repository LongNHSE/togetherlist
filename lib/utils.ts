import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import http from './http';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getImage(url: string) {
  return await http.get('/images/' + url);
}

export async function fortmatDate(date: Date) {
  const dateFormat = new Date(date);
  return dateFormat.toLocaleDateString('en-US');
}
export async function formatDateTo(date: Date) {
  const dateFormat = new Date(date);
  dateFormat.setMonth(dateFormat.getMonth() + 1);
  return dateFormat.toLocaleDateString('en-US');
}

export function formatPrice(number: number) {
  return new Intl.NumberFormat('de-DE').format(number);
}
