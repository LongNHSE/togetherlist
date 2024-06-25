'use client';
import authApiRequest from '@/apiRequest/auth/auth.api';
import { deleteCookie } from 'cookies-next';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAppContext } from '@/context/Provider';

export default function LogoutButton() {
  const router = useRouter();
  const { clearAll } = useAppContext();
  async function logoutHandle() {
    try {
      const result = await authApiRequest.logout();
    } catch (error) {
      console.log(error);
    } finally {
      deleteCookie('clientSessionToken');
      deleteCookie('refreshToken');
      localStorage.clear();
      router.push('/home');
      clearAll();
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
