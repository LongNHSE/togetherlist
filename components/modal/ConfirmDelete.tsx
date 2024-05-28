import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CircleAlert } from "lucide-react";
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete',
  description: 'Delete Page',
};

export function ConfirmDelete() {
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-red-600 w-20 text-white focus:bg-red-600 active:bg-red-700">Delete</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center">
          <DialogHeader >
            <DialogTitle className="text-xl mb-3 ml-20">Confirm Delete</DialogTitle>
            <CircleAlert className="h-28 w-28 ml-24 text-orange-400"/>
            <DialogDescription >
            Are you sure you want to delete this card?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" className="bg-red-500 hover:bg-red-800">Yes, delete it!</Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-800">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}
