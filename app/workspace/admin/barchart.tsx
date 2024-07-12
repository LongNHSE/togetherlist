"use client";

import { useState } from "react";
import { CandlestickChart } from "lucide-react";
import {
  BarChart as BarGraph,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  Tooltip,
  CartesianGrid,
} from "recharts";

type RevenueData = { month: string; total: number };

const revenueMonth: RevenueData[] = [
  { month: "Jan", total: 500 },
  { month: "Feb", total: 200 },
  { month: "Mar", total: 800 },
  { month: "Apr", total: 300 },
  { month: "May", total: 600 },
  { month: "Jun", total: 400 },
  { month: "Jul", total: 900 },
  { month: "Aug", total: 700 },
  { month: "Sep", total: 400 },
  { month: "Oct", total: 800 },
  { month: "Nov", total: 920 },
  { month: "Dec", total: 1300 },
];

const getQuarterData = (quarter: number): RevenueData[] => {
  const quarters: { [key: number]: string[] } = {
    1: ["Jan", "Feb", "Mar","Apr"],
    2: ["May", "Jun","Jul", "Aug"],
    3: ["Sep","Oct", "Nov", "Dec"]
  };
  return revenueMonth.filter((data) => quarters[quarter].includes(data.month));
};

const Barchart = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<number>(1);
  const quarterData = getQuarterData(selectedQuarter);
  const totalSum = quarterData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="bg-white shadow flex w-full flex-col gap-3 rounded-[5px] p-5 text-black">
      <section className="flex justify-between gap-2 text-black font-bold text-lg">
        <p>Total revenue: ${totalSum}</p>
        <CandlestickChart className="h-5 w-5 mt-1" />
      </section>
      <select
        className="mb-8 p-2 border rounded w-44"
        value={selectedQuarter}
        onChange={(e) => setSelectedQuarter(Number(e.target.value))}
      >
        <option value={1}>Q1 (Jan - Apr)</option>
        <option value={2}>Q2 (May - Aug)</option>
        <option value={3}>Q3 (Sep - Dec)</option>
      </select>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarGraph
          data={quarterData}
          margin={{ top: 0, bottom: 0, right: 0, left: -15 }}
        >
          <XAxis
            dataKey={"month"}
            stroke="#000000"
            fontSize={13}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            dataKey={"total"}
            stroke="#000000"
            fontSize={13}
            padding={{ top: 0, bottom: 0 }}
            tickFormatter={(value) => `$${value}`}
          />
          <CartesianGrid strokeDasharray="2 2" className="opacity-30" />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { month, total } = payload[0].payload;
                return (
                  <div className="bg-gray-800 text-white p-4 rounded shadow-lg">
                    <p className="text-sm">{`${month}: $${total}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey={"total"} radius={[5, 5, 0, 0]} fill="#1E90FF" barSize={50} />
        </BarGraph>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
