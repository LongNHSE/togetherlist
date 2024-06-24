import http from '@/lib/http';
const notificationApiRequest = {
  getMyNotifications: (page: number, limit: number) =>
    http.get('/notifications/my?page=' + page + '&limit=' + limit),
  updateNotification: (id: string, body: any) =>
    http.patch('/notifications/my/' + id, body),
};

export default notificationApiRequest;
