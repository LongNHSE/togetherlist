import http from '@/lib/http';

const taskApiRequest = {
  create: (body: any) => http.post('/tasks', body),
  update: (id: string | undefined, body: any) =>
    http.patch(`/tasks/${id}`, body),
  delete: (id: string) => http.delete(`/tasks/${id}`, {}),
  getPercentMonth: (boardId: string, year: string, month: string) =>
    http.get(`/tasks/board/${boardId}/reportWeek?year=${year}&month=${month}`),
};

export default taskApiRequest;
