'use client';
import { getCookie, getCookies } from 'cookies-next';

import React from 'react';

const page = () => {
  const cookie = getCookies();

  console.log(cookie);
  return <div>Hello</div>;
};

export default page;
