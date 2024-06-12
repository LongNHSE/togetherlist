import { ArrowRight } from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    <div className="flex align-middle w-screen h-screen">
      <div className="flex flex-col border-2 min-w-56 w-auto min-h-44 rounded-lg m-auto p-4 space-y-4 ">
        <div className="w-44">
          <img src="https://firebasestorage.googleapis.com/v0/b/togetherlist-e8f05.appspot.com/o/icon%2FGroup%20392.png?alt=media&token=441d1823-fed8-499c-82d0-45a9dde5ed4c" />
        </div>
        <div>TogetherList / Front End / KAN-44</div>
        <div className="">
          <span className="text-xl font-semibold text-blue-600">Task name</span>
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-20 border-2 rounded-full flex justify-center ">
            <div className="w-fit h-fit flex  my-auto mx-auto">
              <img src="https://firebasestorage.googleapis.com/v0/b/togetherlist-e8f05.appspot.com/o/icon%2FGroup%20392.png?alt=media&token=441d1823-fed8-499c-82d0-45a9dde5ed4c" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="space-x-3">
              <span>Nguyen Huy Long</span>
              <span>8:31 PM</span>
            </div>

            <div className="flex flex-row mt-5 space-x-2">
              <div className="flex my-auto mr-3">Status</div>
              <div className="border-2 p-1.5 rounded-md my-auto bg-blue-100">
                <span className="line-through	">In Progress</span>
              </div>
              <div className="flex my-auto">
                <ArrowRight />
              </div>
              <div className="border-2 p-1.5 rounded-md my-auto bg-green-200">
                <span className="">Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
