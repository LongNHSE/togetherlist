'use client';
import React from 'react';
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

const ReportBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
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
        <Bar dataKey="completed" fill="#4CAF50" name="Completed Tasks" />
        <Bar dataKey="pending" fill="#FFC107" name="Pending Tasks" />
        <Bar dataKey="overdue" fill="#F44336" name="Overdue Tasks" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportBarChart;
