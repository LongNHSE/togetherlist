'use client';
import authApiRequest from '@/apiRequest/auth/auth.api';
import { deleteCookie } from 'cookies-next';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutButton() {
  const router = useRouter();
  async function logoutHandle() {
    try {
      const result = await authApiRequest.logout();
    } catch (error) {
      console.log(error);
    } finally {
      deleteCookie('clientSessionToken');
      deleteCookie('refreshToken');
      localStorage.removeItem('user');
      router.push('/home');
    }
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
