'use client';
import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import EmptyPage from '../EmptyPage';

const ReportPieChart = ({ board }: { board: any }) => {
  const [data01, setData01] = useState<any>([]);
  React.useEffect(() => {
    if (board && board.statuses) {
      const data = board?.statuses.map((list: any) => ({
        name: list.name,
        color: list.color,
        value: Math.round(list.value * 0.01 * board.totalTask),
      }));
      console.log(data);
      if (data[0].name === undefined && data[0].color === undefined) {
        setData01(null);
      } else {
        data.forEach((item: any, index: number) => {
          if (item.name === undefined && item.color === undefined) {
            data.splice(index, 1);
          }
        });
        setData01(data);
      }
    }
  }, [board]);
  // Corrected code snippet
  return data01 ? (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {data01.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <div>
      <EmptyPage subject="data" />
    </div>
  );
};

export default ReportPieChart;
