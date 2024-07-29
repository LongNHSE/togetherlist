'use client';

import { UserPlus } from 'lucide-react';
import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';

const data = [
  {
    type: 'Free',
    value: 35,
  },
  {
    type: 'Premium',
    value: 25,
  },
  {
    type: 'Business',
    value: 20,
  },
];
const totalSum = data.reduce((acc, curr) => acc + curr.value, 0);

export const UserType = () => {
  return (
    <div className="bg-white shadow flex w-full flex-col gap-3 rounded-[5px] p-5 text-black">
      <section className="flex justify-between gap-2 text-black font-bold text-lg">
        <p>Subscription type</p>
        <UserPlus className="h-6 w-6" />
      </section>
      <p className="mb-10">Total users: {totalSum}</p>
      <ResponsiveContainer width={'100%'} height={300}>
        <PieChart width={380} height={380}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#00BFFF"
            label={({ type, value }) => `${type}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.type === 'Free'
                    ? '#6495ED'
                    : entry.type === 'Premium'
                    ? '#4169E1'
                    : '#8A2BE2'
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
