import http from '@/lib/http';

export const payosApi = {
  createPayment: (body: any) => http.post('payments/create-payment-link', body),
};
