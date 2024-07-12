import http from '@/lib/http';

export const subscriptionTypeApiRequest = {
  getSubscriptionTypeList: () => http.get(`subscription-type`),
  //   createSubscriptionType: (body: any) => http.post(`subscription-types`, body),
  //   updateSubscriptionType: (id: string, body: any) =>
  //     http.patch(`subscription-types/${id}`, body),
  //   deleteSubscriptionType: (id: string) =>
  //     http.delete(`subscription-types/${id}`, {}),
};
