import { axiosPrivate } from '@/lib/ApiCalller';
import { ApiResponse } from '@/types/ApiResponse';
import { Message } from '@/types/Message';

export const getRoomMessages = async (
  roomId: string,
): Promise<ApiResponse<Message[]>> =>
  axiosPrivate().get(`/room-chat/${roomId}/messages`);

export const sendMessage = async (
  roomId: string,
  message: string,
): Promise<ApiResponse<Message>> =>
  axiosPrivate().post(`/room-chat/${roomId}/messages`, {
    content: message,
    roomChatId: roomId,
  });
