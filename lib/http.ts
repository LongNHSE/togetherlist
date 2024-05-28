import { deleteCookie, getCookie } from 'cookies-next';

type CustomOption = RequestInit & { baseUrl?: string | undefined };

class HttpError extends Error {
  statusCode: number;
  payload: any;
  constructor({ statusCode, payload }: { statusCode: number; payload: any }) {
    super('Http Error');
    this.statusCode = statusCode;
    this.payload = payload;
  }
}

import { setCookie } from 'cookies-next';

const refreshToken = async () => {
  try {
    const refreshToken = getCookie('refreshToken');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const data = await res.json();
    if (data.statusCode === 403 || data.statusCode === 401) {
      deleteCookie('clientSessionToken');
      deleteCookie('refreshToken');
      localStorage.removeItem('user');
      localStorage.clear();
      window.location.href = '/login';
      throw new Error('Authorization failed');
    } else {
      setCookie('clientSessionToken', data.accessToken);
    }
  } catch (error) {
    deleteCookie('clientSessionToken');
    deleteCookie('refreshToken');
    localStorage.removeItem('user');
    localStorage.clear();
    throw new Error('Authorization failed');
  }
};

const request = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomOption | undefined,
  retryCount = 0,
): Promise<any> => {
  const sessionToken = getCookie('clientSessionToken');
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeader = {
    'Content-Type': 'application/json',
  };
  const baseUrl = options?.baseUrl || process.env.NEXT_PUBLIC_API_URL;

  // Check if the url has '/' or not exp account/me and /account/me
  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...baseHeader,
        Authorization: sessionToken ? `Bearer ${sessionToken}` : '',
        //Define addtion header in options like Authorization
        ...options?.headers,
      },
      body,
      method,
    });
    const data = await res.json();
    if (data.statusCode === 401) {
      if (retryCount >= 3) {
        throw new Error('Falied to refresh token!!');
      }
      await refreshToken();
      console.log(retryCount);
      return request(method, url, options, retryCount + 1);
    } else {
      console.log(data);
      return data;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      if (retryCount >= 3) {
        throw new Error('Falied to refresh token!!');
      }
      await refreshToken();
      return request(method, url, options, retryCount + 1);
    } else {
      throw error;
    }
  }
};

const http = {
  get: (url: string, options?: CustomOption) => request('GET', url, options),
  post: (
    url: string,
    body: any,
    options?: Omit<CustomOption, 'body'> | undefined,
  ) => request('POST', url, { ...options, body }),
  put: (
    url: string,
    body: any,
    options?: Omit<CustomOption, 'body'> | undefined,
  ) => request('PUT', url, { ...options, body }),
  patch: (
    url: string,
    body: any,
    options?: Omit<CustomOption, 'body'> | undefined,
  ) => request('PATCH', url, { ...options, body }),
  delete: (
    url: string,
    body: any,
    options?: Omit<CustomOption, 'body'> | undefined,
  ) => request('DELETE', url, { ...options, body }),
};

export default http;
