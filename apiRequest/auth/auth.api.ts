import http from '@/lib/http';

const authApiRequest = {
  login: (body: any) => http.post('/auth/signin', body),
  logout: () => http.get('/auth/logout'),
};

export default authApiRequest;
