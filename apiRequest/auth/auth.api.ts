import http from '@/lib/http';

const autheApiRequest = {
  login: (body: any) => http.post('/auth/signin', body),
};

export default autheApiRequest;
