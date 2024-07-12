import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import http from './http';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getImage(url: string) {
  return await http.get('/images/' + url);
}
