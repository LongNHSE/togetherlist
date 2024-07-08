import http from '@/lib/http';

const subcriptionPlanApi = {
  getMySubscriptionPlan: () => http.get('/subscription-plans/my'),
};

export default subcriptionPlanApi;
