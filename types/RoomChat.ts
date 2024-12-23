import { User } from './User';

export interface RoomChat {
  _id: string;
  workspaceId: string;
  creatorId: string;
  members: User[];
  name: string;
  type: RoomChatType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum RoomChatType {
  ONE_TO_ONE = 'one_to_one',
  GROUP = 'group',
}
