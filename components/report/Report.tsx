'use client';
import React, { useState } from 'react';
import CardReport from '@/components/report/CardReport';
import { AlertCircle, Clock, FolderCheck, ListChecks } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useAppContext } from '@/context/Provider';
import boardApiRequest from '@/apiRequest/board/board.api';
import EmptyPage from '../EmptyPage';
import taskApiRequest from '@/apiRequest/task/task.api';

const ReportBarChart = dynamic(
  () => import('@/components/report/ReportBarChart'),
);
const ReportPieChart = dynamic(
  () => import('@/components/report/ReportPieChart'),
);
const monthsArray = [
  { key: '1', value: 'January' },
  { key: '2', value: 'February' },
  { key: '3', value: 'March' },
  { key: '4', value: 'April' },
  { key: '5', value: 'May' },
  { key: '6', value: 'June' },
  { key: '7', value: 'July' },
  { key: '8', value: 'August' },
  { key: '9', value: 'September' },
  { key: '10', value: 'October' },
  { key: '11', value: 'November' },
  { key: '12', value: 'December' },
];
const Report = () => {
  const [board, setBoard] = useState([]);
  const [currentBoard, setCurrentBoard] = useState<any>();
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [chartData, setChartData] = useState<any>([]);
  const { currentWorkspace } = useAppContext();
  const fetchBoard = async () => {
    try {
      if (!currentWorkspace) return;
      const res = await boardApiRequest.getBoardList(currentWorkspace._id);
      if (res.data.length === 0) return;
      setCurrentBoard(res.data[0]);
      setBoard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChartData = async () => {
    try {
      if (!currentBoard) return;
      const res = await taskApiRequest.getPercentMonth(
        currentBoard._id,
        year,
        month,
      );
      const data = countTasksByWeekAndStatus(res.data);
      setChartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const countTasksByWeekAndStatus = (tasks: any) => {
    const result: { name: string; [key: string]: any }[] = [];

    tasks.forEach((task: any) => {
      const weekKey = task.week;
      const statusName = task.status.name;

      // Find the corresponding week entry or create a new one
      let weekEntry = result.find((entry) => entry.name === `Week ${weekKey}`);

      if (!weekEntry) {
        weekEntry = { name: `Week ${weekKey}` };
        result.push(weekEntry);
      }

      // Increment the appropriate status count or initialize it if it doesn't exist
      if (!weekEntry[statusName]) {
        weekEntry[statusName] = 0;
      }
      weekEntry[statusName]++;
    });

    // Sort results by week number (assuming week numbers are 1-based and continuous)
    result.sort((a, b) => {
      const weekNumberA = parseInt(a.name.split(' ')[1]);
      const weekNumberB = parseInt(b.name.split(' ')[1]);
      return weekNumberA - weekNumberB;
    });

    return result;
  };
  React.useEffect(() => {
    fetchBoard();
  }, [currentWorkspace]);

  React.useEffect(() => {
    getChartData();
  }, [currentBoard, year, month]);

  return (
    <div>
      {board.length === 0 ? (
        <div>
          <EmptyPage subject="boards"></EmptyPage>
        </div>
      ) : (
        <div>
          <div className="my-5">
            <Select
              value={currentBoard}
              onValueChange={(value) => {
                setCurrentBoard(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Board" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Board</SelectLabel>
                  {board.map((item: any) => (
                    <SelectItem key={item._id} value={item}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {currentBoard && (
            <div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* <CardReport
                  title="Total Tasks"
                  content={'100'}
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
                /> */}
              </div>

              <div className="grid gap-8 md:grid-cols-[1fr_2fr] grid-cols-1">
                <div className="mt-4 border-2 p-4 rounded-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Task Distribution
                  </h2>
                  <div className="flex flex-row min-w-[500px]">
                    <ReportPieChart board={currentBoard} />
                    <div className="w-36 flex flex-col my-auto">
                      {currentBoard?.taskStatus.map((status: any) => (
                        <div
                          key={status.index}
                          className="flex flex-row items-center space-x-2"
                        >
                          <div
                            className="p-2 rounded-md"
                            style={{
                              backgroundColor: status.color,
                              width: '1rem',
                              height: '1rem',
                            }}
                          ></div>
                          <div className="truncate w-56">{status.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-2 p-4 rounded-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Task Tracking Overview
                  </h2>
                  <div className="flex flex-row space-x-4">
                    <div className="my-5">
                      <Select
                        value={year}
                        onValueChange={(value) => {
                          setYear(value);
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a Board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Year</SelectLabel>
                            {Array.from({ length: 5 }, (_, i) => {
                              const year = new Date().getFullYear() - 1 + i;
                              return (
                                <SelectItem key={i} value={year.toString()}>
                                  {year.toString()}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="my-5">
                      <Select
                        value={month}
                        onValueChange={(value) => {
                          setMonth(value);
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a Board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Month</SelectLabel>
                            {monthsArray.map((item) => (
                              <SelectItem key={item.key} value={item.key}>
                                {item.value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <ReportBarChart chartData={chartData} board={currentBoard} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
