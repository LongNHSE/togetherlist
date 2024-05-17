'use client';
import authApiRequest from '@/apiRequest/auth/auth.api';
import { deleteCookie } from 'cookies-next';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutButton() {
  const router = useRouter();
  async function logoutHandle() {
    console.log('logout');

    const result = await authApiRequest.logout();
    console.log(result);
    deleteCookie('clientSessionToken');
    deleteCookie('refreshToken');
    router.push('/home');
  }
  return (
    <div
      className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300"
      onClick={() => logoutHandle()}
    >
      <LogOut onClick={() => logoutHandle()} />
      <div className="ml-3">Logout</div>
    </div>
  );
}
