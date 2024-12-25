import { getRoomMessages } from '@/apiRequest/messages/messages.api';
import { ApiResponse } from '@/types/ApiResponse';
import { Message } from '@/types/Message';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetMessage = (roomId: string) => {
  const { data, isLoading, isError } = useQuery<
    ApiResponse<Message[]>,
    AxiosError
  >({
    queryKey: ['getRoomMessages', roomId],
    queryFn: async () => {
      const response = await getRoomMessages(roomId);
      return response.data;
    },
  });
  let messages: Message[] = data?.data;
  return {
    data: messages,
    isLoading,
    isError,
  };
};
