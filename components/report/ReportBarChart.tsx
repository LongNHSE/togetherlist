'use client';
import React, { useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Week 1',
    completed: 20,
    pending: 10,
    overdue: 5,
  },
  {
    name: 'Week 2',
    completed: 25,
    pending: 8,
    overdue: 7,
  },
  {
    name: 'Week 3',
    completed: 22,
    pending: 12,
    overdue: 6,
  },
  {
    name: 'Week 4',
    completed: 30,
    pending: 9,
    overdue: 4,
  },
  {
    name: 'Week 5',
    completed: 28,
    pending: 11,
    overdue: 5,
  },
];

const ReportBarChart = ({
  chartData,
  board,
}: {
  chartData: any;
  board: any;
}) => {
  console.log(board);
  return (
    <ResponsiveContainer height={460}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {board?.taskStatus.map((status: any) => (
          <Bar
            barSize={40}
            dataKey={status.name}
            key={status._id}
            fill={status.color}
            name={status.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportBarChart;
