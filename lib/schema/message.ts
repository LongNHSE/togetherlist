import { z } from 'zod';

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}
