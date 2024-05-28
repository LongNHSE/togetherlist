import Layout from '@/components/sidebar/layout';
import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ConfirmDelete } from "@/components/modal/ConfirmDelete";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modal',
  description: 'Modal Page',
};

export default function Modal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
            Open Task
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <DialogDescription className="text-sm font-bold">TGL-21</DialogDescription>
            </div>
            <div>
              <select className="bg-white border border-gray-300 h-9 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="inprogress">In Progress</option>
                <option value="completed">Done</option>
                <option value="pending">Test</option>
              </select>
            </div>
          </div>
          <div className="border-b pb-4 mb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-red-600">Task: Important</DialogTitle>
            </DialogHeader>
          </div>
          <div className="mb-4">
            <DialogDescription className="font-bold mb-2">Description</DialogDescription>
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description here..."
            />
          </div>
          <div className="space-y-2 mb-4">
            <DialogDescription>
              <span className="font-semibold">Duration:</span> From 19/05/2024 to 20/05/2024
            </DialogDescription>
            <DialogDescription>
              <span className="font-semibold">Assignee:</span> QKL
            </DialogDescription>
            <DialogDescription>
              <span className="font-semibold">Priority:</span> Yes
            </DialogDescription>
          </div>
          <div className="flex justify-between space-x-52">
            <DialogDescription >
              <span className="font-semibold">Created at:</span> 20/05/2024
            </DialogDescription>
            <DialogDescription>
              <span className="font-semibold">Updated at:</span> 21/05/2024
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    
  );
}
