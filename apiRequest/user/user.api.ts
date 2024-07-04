import http from '@/lib/http';

const userApiRequest = {
  updateAvatar: (formData: FormData) =>
    http.postFile('/users/avatar', formData),
};

export default userApiRequest;
