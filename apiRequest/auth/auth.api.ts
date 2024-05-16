import http from '@/lib/http';

const authApiRequest = {
  login: (body: any) => http.post('/auth/signin', body),
};

export default authApiRequest;
