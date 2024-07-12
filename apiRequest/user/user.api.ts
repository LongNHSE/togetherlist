import http from '@/lib/http';
const userApiRequest = {
  updateAvatar: (formData: FormData) =>
    http.postFile('/users/avatar', formData),
  getAllUsers: () => http.get('/users'),
};
export default userApiRequest;