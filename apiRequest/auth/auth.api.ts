import http from '@/lib/http';

const authApiRequest = {
  login: (body: any) => http.post('/auth/signin', body),
  logout: () => http.get('/auth/logout'),
  isTokenValid: () => http.get('/auth/is-token-valid'),
};

export default authApiRequest;
