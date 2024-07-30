'use client';
import userApiRequest from '@/apiRequest/user/user.api';
import { column } from '@/components/adminComponent/user-table/column';
import { DataTable } from '@/components/adminComponent/user-table/data-table';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [users, setUser] = useState([]);

  const fetchUser = async () => {
    const result = await userApiRequest.getUser();
    setUser(result.data.users);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="container mx-auto">
      <DataTable columns={column} data={users} />
    </div>
  );
};

export default Page;
