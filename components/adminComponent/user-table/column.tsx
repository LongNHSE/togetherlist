'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserType } from '@/lib/schema/user.schema';
import { formatDateTo, fortmatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const column: ColumnDef<UserType>[] = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      return (
        <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30 rounded-full border-2 border-dark_brown align-middle items-center flex mx-auto">
          {row.getValue('avatar') ? (
            <AvatarImage
              src={
                `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/` +
                row.getValue('avatar')
              }
              alt={row.getValue('username')}
            />
          ) : (
            <AvatarImage
              src={row.getValue('avatar')}
              alt={row.getValue('username')}
            />
          )}

          <AvatarFallback className="w-10 h-10 bg-orange-300">
            {row.original.firstName[0]}
            {row.original.lastName[0]}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },

  {
    accessorKey: 'subscriptionPlan.subscriptionType.name',
    header: 'Subscription Plan',
    cell: ({ row }) => {
      const sub: string = row.original?.subscriptionPlan?.subscriptionType.name;
      const getStyle = () => {
        if (sub) {
          if (sub.toLowerCase() === 'premium') {
            return 'bg-green-500'; // Example class for premium subscription
          }
          if (sub.toLowerCase() === 'free') {
            return 'bg-yellow-500'; // Example class for premium subscription
          }
        }
        return '';
      };

      return (
        <div
          className={`border-2 rounded-3xl align-middle text-center  ${getStyle()}`}
        >
          {sub}
        </div>
      );
    },
  },
  {
    accessorKey: 'subscriptionPlan.from',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          From
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{fortmatDate(row.original.subscriptionPlan.createdAt)}</div>;
    },
  },
  {
    accessorKey: 'subscriptionPlan.to',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          To
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.subscriptionPlan.to ? (
            fortmatDate(row.original.subscriptionPlan.to)
          ) : (
            <div></div>
          )}
        </div>
      );
    },
  },
];
