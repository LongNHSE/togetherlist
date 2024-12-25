import { UserType } from '@/lib/schema/user.schema';
import { RoomChat } from './RoomChat';
import { User } from './User';

export interface Message {
  roomChat: RoomChat;
  sender: UserType | string;
  task?: any;
  content: string;
  _id?: string;
}
