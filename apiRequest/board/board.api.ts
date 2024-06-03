import http from '@/lib/http';

const boardApiRequest = {
  getBoardList: (workspaceId: string | undefined) =>
    http.get('/boards/workspaces/' + workspaceId),
  getBoardDetail: (boardId: string) => http.get('/boards/' + boardId),
  createBoard: (boardData: object) => {
    return http.post('/boards', boardData);
  },
  updateBoard: (boardId: string, boardData: object) => {},
  deleteBoard: (boardId: string) => http.delete('/boards/' + boardId, {}),
  addNewBoardStatus: (boardId: string, statusData: object) =>
    http.post('/boards/' + boardId + '/board-status', statusData),
  updateBoardStatus: (boardId: string, statusId: string, order: any) =>
    http.patch('/boards/' + boardId + '/board-status/' + statusId, order),
};

export default boardApiRequest;
