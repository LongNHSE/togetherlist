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
  updateBoardStatus: (boardId: string, order: any) =>
    http.put('/boards/' + boardId + '/board-status', order),
};

export default boardApiRequest;
