import http from '@/lib/http';

const userApiRequest = {
  getAllUsers: () => http.get('/users'),
};

export default userApiRequest;
