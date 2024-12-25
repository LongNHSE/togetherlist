import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';
import { RoomChat } from '@/types/RoomChat';
import { getMyRoomChat } from '@/apiRequest/room-chat/room-chat.api';

interface UseGetMyRoomChatParams {
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  pagination?: PaginationState;
}

export const useGetMyRoomChat = ({
  sorting,
  columnFilters,
  pagination,
}: UseGetMyRoomChatParams) => {
  const { data, status, isPending, isError, isLoading } = useQuery<
    ApiResponse<RoomChat>,
    AxiosError
  >({
    queryKey: ['getMyRoomChat', sorting, columnFilters, pagination],
    queryFn: async () => {
      const response = await getMyRoomChat();
      return response.data;
    },
  });
  let myRoomList: RoomChat[] = data?.data;

  return {
    data: myRoomList,
    status,
    isLoading,
    isError,
  };
};
