'use client';
import React from 'react';
import CardReport from '@/components/report/CardReport';
// import ReportBarChart from '@/components/report/ReportBarChart';
// import ReportPieChart from '@/components/report/ReportPieChart';
import { AlertCircle, Clock, FolderCheck, ListChecks } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReportBarChart = dynamic(
  () => import('@/components/report/ReportBarChart'),
);
const ReportPieChart = dynamic(
  () => import('@/components/report/ReportPieChart'),
);

const Report = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardReport
          title="Task Completion"
          content={'59/100'}
          subContent={'+12% from last month'}
          icon={<FolderCheck />}
        />
        <CardReport
          title="Pending Tasks"
          content={'30'}
          subContent={'-8% from last month'}
          icon={<ListChecks />}
        />
        <CardReport
          title="Average Completion Time"
          content={'5 days'}
          subContent={'+1 day from last month'}
          icon={<Clock />}
        />
        <CardReport
          title="Task Overdue"
          content={'10'}
          subContent={'+2 from last month'}
          icon={<AlertCircle />}
        />
      </div>

      <div className="grid gap-8 grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
          <ReportPieChart />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Task Tracking Overview</h2>
          <ReportBarChart />
        </div>
      </div>
    </>
  );
};

export default Report;
