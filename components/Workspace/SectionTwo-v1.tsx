'use client';

import Link from 'next/link';
import WorkspaceCard from './WorkspaceCard2';
import { Suspense, useEffect, useState } from 'react';
import boardApiRequest from '@/apiRequest/board/board.api';
import { useAppContext } from '@/context/Provider';

const SectionTwo = () => {
  const { currentWorkspace } = useAppContext();

  const [board, setBoard] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const loadBoard = async () => {
    try {
      if (currentWorkspace) {
        const res = await boardApiRequest.getBoardList(currentWorkspace._id);
        setBoard(res.data);
      } else {
        setBoard([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentWorkspace) {
      loadBoard();
    }
  }, [currentWorkspace]);

  return (
    <section className="grid grid-cols-3 gap-x-5 gap-y-7">
      {board && board.length > 0 ? (
        board.map((item, index) => (
          <Link key={index} href={`workspace/board/${item._id}`}>
            <div className="hover:-translate-y-2 transform transition">
              <Suspense fallback>
                {/* <WorkspaceCard board={item} /> */}
              </Suspense>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-3 flex justify-center items-center">
          <span className="text-slate-500">No board found</span>
        </div>
      )}
    </section>
  );
};

export default SectionTwo;
