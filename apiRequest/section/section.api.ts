import http from '@/lib/http';

const sectionApiRequest = {
  createSection: (body: any) => http.post('sections', body),
};

export default sectionApiRequest;
