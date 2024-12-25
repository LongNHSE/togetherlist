import { axiosPrivate } from '@/lib/ApiCalller';
import { ApiResponse } from '@/types/ApiResponse';
import { RoomChat } from '@/types/RoomChat';

export const getMyRoomChat = async (): Promise<ApiResponse<RoomChat>> =>
  axiosPrivate().get('/room-chat/my');
