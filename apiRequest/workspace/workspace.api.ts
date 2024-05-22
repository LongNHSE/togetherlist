import http from '@/lib/http';

const workspaceApiRequest = {
  create: (body: any) => http.post('/workspaces', body),
  getMyWorkspaces: () => http.get('/workspaces/me'),
};

export default workspaceApiRequest;
