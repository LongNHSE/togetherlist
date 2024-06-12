import http from '@/lib/http';

const sectionApiRequest = {
  createSection: (body: any) => http.post('sections', body),
  deleteSection: (id: string) => http.delete(`sections/${id}`, {}),
};

export default sectionApiRequest;
