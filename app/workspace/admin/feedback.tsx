"use client";

import React from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Smile, Meh, Frown, MessageSquareMore } from 'lucide-react';

const feedbackData = [
  { label: "Bad", value: 10, color: "red" },
  { label: "Normal", value: 30, color: "#CCCC00" },
  { label: "Good", value: 50, color: "green" },
];

const renderCustomYAxisTick = (props: { x: number; y: number; payload: { value: string } }) => {
  const { x, y, payload } = props;
  let IconComponent;
  let iconColor;

  switch (payload.value) {
    case 'Bad':
      IconComponent = Frown;
      iconColor = 'red';
      break;
    case 'Normal':
      IconComponent = Meh;
      iconColor = '#CCCC00';
      break;
    case 'Good':
      IconComponent = Smile;
      iconColor = 'green';
      break;
    default:
      IconComponent = null;
      iconColor = 'black';
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {IconComponent && <IconComponent x={-29} y={-17} width={35} height={35} color={iconColor} />}
    </g>
  );
};
const totalSum = feedbackData.reduce((acc, curr) => acc + curr.value, 0);

const FeedbackChart = () => {
  return (
    <div className="bg-white shadow flex w-full flex-col gap-3 rounded-[5px] p-5 text-black">
      <div className="flex justify-between">
      <h2 className="text-lg font-bold">User feedback</h2>
      <MessageSquareMore className="h-5 w-5 mt-1" />
      </div>
   
      <p>Total feedbacks: {totalSum}</p>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={feedbackData}
          layout="vertical"
          margin={{ top: 10, right: 10, left: -22, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis type="number" />
          <YAxis dataKey="label" type="category" tick={renderCustomYAxisTick} className="mt-2" />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { label, value } = payload[0].payload;
                return (
                  <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
                    <p className="text-sm">{`${label}: ${value}`}</p>
                  </div>
                );
              }
              return null;
            }}
          ></Tooltip>
          <Bar dataKey="value" fill="#BA55D3" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeedbackChart;
