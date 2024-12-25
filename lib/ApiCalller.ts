import { API_URL } from '@/components/const';
import axios, { HttpStatusCode, InternalAxiosRequestConfig } from 'axios';
import { error } from 'console';
import { deleteCookie, getCookies, setCookie } from 'cookies-next';
// import { cookies } from 'next/headers';
import Cookies from 'js-cookie';

import { any } from 'zod';

function handleRequestInterceptors(config: InternalAxiosRequestConfig<any>) {
  const token = Cookies.get('clientSessionToken');
  // const token = cookiesResult?.clientSessionToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

async function handleResponseError(error: any) {
  const originalRequest = error.config;
  const refreshToken = Cookies.get('refreshToken');

  if (!refreshToken) {
    deleteCookie('clientSessionToken');
    deleteCookie('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  if (
    error.response?.status === HttpStatusCode.Unauthorized &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    const newToken = await axiosPublic().post('/auth/refresh-token', {
      refreshToken,
    });
    if (newToken) {
      setCookie('clientSessionToken', newToken.data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${newToken.data.accessToken}`;
      return axiosPrivate()(originalRequest);
    } else if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      originalRequest._retry
    ) {
      deleteCookie('clientSessionToken');
      deleteCookie('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
}

const axiosPublic = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

const axiosPrivate = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) =>
      handleRequestInterceptors(config),
    (error) => Promise.reject(error),
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleResponseError(error),
  );
  return axiosInstance;
};

export { axiosPublic, axiosPrivate };
