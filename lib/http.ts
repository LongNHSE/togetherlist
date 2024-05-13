type CustomOption = RequestInit & { baseUrl?: string | undefined };

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

const request = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOption | undefined,
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeader = {
    'Content-Type': 'application/json',
  };

  const baseUrl = options?.baseUrl || process.env.NEXT_PUBLIC_API_URL;

  // Check if the url has '/' or not exp account/me and /account/me
  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeader,
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
    throw new HttpError(data);
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
