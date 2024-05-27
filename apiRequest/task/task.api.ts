import http from '@/lib/http';

const taskApiRequest = {
  create: (body: any) => http.post('/tasks', body),
  update: (id: string, body: any) => http.patch(`/tasks/${id}`, body),
};

export default taskApiRequest;
