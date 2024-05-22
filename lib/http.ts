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

    if (!res.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await res.json();
    setCookie('clientSessionToken', data.accessToken);
  } catch (error) {
    deleteCookie('clientSessionToken');
    deleteCookie('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Refresh token is invalid');
  }
};

const request = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOption | undefined,
) => {
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

    if (res.ok) {
      return data;
    } else {
      console.log(error);

      throw new HttpError(data);
    }
  } catch (error) {
    await refreshToken();
    request(method, url, options);
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
  delete: (
    url: string,
    body: any,
    options?: Omit<CustomOption, 'body'> | undefined,
  ) => request('DELETE', url, { ...options, body }),
};

export default http;
