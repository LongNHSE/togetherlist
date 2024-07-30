'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/general');
  }, [router]);

  return null; // or a loading indicator if preferred
};

export default Admin;
