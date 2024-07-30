'use client';
import { Bell, Minus, Slash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { io } from 'socket.io-client';
import { getCookie } from 'cookies-next';
import authApiRequest from '@/apiRequest/auth/auth.api';
import notificationApiRequest from '@/apiRequest/notifcation/notification.api';
import { NotificationType } from '@/lib/schema/notification/notification.schema';
import { Arrow, DropdownMenuSub } from '@radix-ui/react-dropdown-menu';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const DropdownNotification = () => {
  const [tokenValid, setTokenValid] = React.useState(false);
  const [notification, setNotification] = React.useState<NotificationType[]>(
    [],
  );
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [timePast, setTimePast] = React.useState(0);
  const hasRun = React.useRef(false);

  const getMyNotifications = async () => {
    const result = await notificationApiRequest.getMyNotifications(page, limit);
    const notification: NotificationType[] = result.data;
    setNotification(notification);
    setUnreadCount(
      notification?.filter((item) => item.status === 'unread').length,
    );
  };

  let socket: any; // Define socket variable outside to be accessible for cleanup

  const updateNotification = async (item: NotificationType) => {
    if (item.status !== 'unread') return;

    if (item._id) {
      await notificationApiRequest.updateNotification(item._id, {
        status: 'read',
      });
      const updatedNotification = notification.map((el) => {
        if (el._id === item._id) {
          return { ...el, status: 'read' };
        }
        return el;
      });
      setNotification(updatedNotification);
      setUnreadCount(
        updatedNotification.filter((item) => item.status === 'unread').length,
      );
    }
  };

  const connectSocket = () => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/' + 'notification';
    authApiRequest
      .isTokenValid()
      .then((res) => {
        setTokenValid(true);
        const token = getCookie('clientSessionToken');
        socket = io(url, {
          extraHeaders: {
            token: token as string,
          },
        });
        socket.on('connect', () => {
          console.log('Connected to server');
        });

        socket.on('notification', (data: NotificationType) => {
          setNotification((currentNotifications: NotificationType[]) => {
            return [data, ...currentNotifications];
          });
          setUnreadCount((currentUnreadCount) => {
            return currentUnreadCount + 1;
          });
        });
      })
      .catch((err) => {
        setTokenValid(false);
      })
      .finally(() => {});
  };

  React.useEffect(() => {
    if (!hasRun.current) {
      getMyNotifications();
      connectSocket();
      hasRun.current = true;
    }
    return () => {
      if (socket) {
        socket.off('notification'); // Remove the specific event listener
        socket.disconnect(); // Disconnect the socket
      }
    };
  }, []);
  //Every 60 seconds, the component will re-render to update the time past
  const [, setTick] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1); // Update state to trigger re-render
    }, 60000); // 30000 ms = 30 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  const renderNotification = (item: NotificationType) => {
    if (item.isNewAssignee) {
      return (
        <div
          onMouseEnter={() => {
            updateNotification(item);
          }}
          className={`flex flex-col items-center justify-between px-2 py-5 border border-gray-200 w-full ${
            item.status === 'unread' ? 'bg-yellow-100' : ''
          }`}
        >
          <div className="flex flex-row justify-between space-x-2 w-full">
            <div>
              <div className="flex flex-row space-x-0">
                <div className="flex flex-row">
                  <p className="text-sm font-bold truncate">Workspace: </p>
                  <span className="ml-2">{item.workspace.name}</span>
                </div>
                <div className="">
                  <Minus size={15} className="mt-0.5 mx-4" />
                </div>
                <div className="flex flex-row">
                  <p className="text-sm font-bold truncate">Task:</p>{' '}
                  <span className="ml-2">{item.task.name}</span>
                </div>
              </div>
              <div className="flex flex-row text-center align-middle mt-2">
                <div className="flex my-auto mr-2">
                  <p>Assignee: </p>
                </div>
                <div className=" flex my-auto">
                  <Avatar className="w-8 h-8 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30 rounded-full">
                    <AvatarImage
                      src={item.user?.avatar}
                      alt={item.user?.username}
                    />
                    <AvatarFallback className="w-8 h-8 bg-orange-500">
                      {item.user?.firstName[0]}
                      {item.user?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="border-b  ml-2 rounded-lg border-blue-300 ">
                  <div className="">
                    <p className="text-lg font-semibold flex my-auto">
                      {item.user?.username}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-xs flex my-auto">{item.user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-end text-end">
              <p className="text-xs">{calculatePastTime(item.createdAt)}</p>
            </div>
          </div>
        </div>
      );
    }
    if (item.isNewStatus) {
      return (
        <div
          onMouseEnter={() => {
            updateNotification(item);
          }}
          className={`flex flex-col items-center justify-between px-2 py-5 border border-gray-200 w-full ${
            item.status === 'unread' ? 'bg-yellow-100' : ''
          }`}
        >
          <div className="flex flex-row justify-between space-x-2 w-full">
            <div>
              <div className="flex flex-row space-x-0">
                <div className="flex flex-row">
                  <p className="text-sm font-bold truncate">Workspace: </p>
                  <span className="ml-2">{item.workspace.name}</span>
                </div>
                <div className="">
                  <Minus size={15} className="mt-0.5 mx-4" />
                </div>
                <div className="flex flex-row">
                  <p className="text-sm font-bold truncate">Task:</p>{' '}
                  <span className="ml-2">{item.task.name}</span>
                </div>
              </div>
              <div className="flex flex-row space-x-2 text-center align-middle mt-2 justify-center">
                <div className="border-2 rounded-lg border-yellow-300 p-2">
                  <p className="text-xs flex my-auto line-through	">
                    {item.oldStatus}
                  </p>
                </div>
                <div className="my-auto">
                  <ArrowRight size={15} />
                </div>
                <div className="border-2 rounded-lg border-green-300 p-2">
                  <p className="text-xs flex my-auto">{item.newStatus}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-end text-end">
              <p className="text-xs">{calculatePastTime(item.createdAt)}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  const calculatePastTime = (time: Date) => {
    const currentTime = new Date();
    const pastTime = new Date(time);
    const differenceInSeconds = Math.floor(
      (currentTime.getTime() - pastTime.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    } else if (differenceInSeconds < 2592000) {
      return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    } else if (differenceInSeconds < 31536000) {
      return `${Math.floor(differenceInSeconds / 2592000)} months ago`;
    } else {
      return `${Math.floor(differenceInSeconds / 31536000)} years ago`;
    }
  };

  return (
    <div className="mr-16">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative hover:opacity-50 cursor-pointer">
            <Bell />
            <span className="absolute top-0 right-0 transform translate-x-[60%] translate-y-[-55%] px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="h-[30rem] w-[25rem] mt-5 p-0">
          <DropdownMenuLabel>Notification</DropdownMenuLabel>
          <div className="flex flex-col">
            <div className="overflow-y-auto h-[25rem]">
              {notification?.map((item: NotificationType, index: number) => (
                <DropdownMenuItem key={index} className="m-0 p-0">
                  {renderNotification(item)}
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuItem className="flex justify-center sticky">
              <DropdownMenuLabel
                onClick={(event) => {
                  event.stopPropagation();
                  console.log('asd');
                }}
              >
                View all
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownNotification;
