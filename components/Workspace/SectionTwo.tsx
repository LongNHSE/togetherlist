'use client';
import Link from 'next/link';
import WorkspaceCard from './WorkspaceCard';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/user';
import boardApiRequest from '@/apiRequest/board/board.api';
import dynamic from 'next/dynamic';
import LoadingSupperMini from './LoadingSupperMini';
import SectionThree from './SectionThree';
import SectionOne from './SectionOne';
import SkeletonCard from '../SkeletonCard';
import EmptyPage from '../EmptyPage';
import { BoardType } from '@/lib/schema/board/board.schema';

const WorkspaceCard = dynamic(() => import('./WorkspaceCard2'), {
  ssr: false,
  loading: () => <SkeletonCard />,
});

const SectionTwo = () => {
  const { currentWorkspace } = useAppContext();

  const [board, setBoard] = useState<BoardType[]>([]);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentWorkspace) {
      loadBoard();
    }
  }, [currentWorkspace]);

  return board && board.length > 0 ? (
    <section className="flex flex-col space-y-5">
      {/* Section One */}
      <SectionOne />
      <div className="grid grid-cols-3 gap-x-5 gap-y-7">
        {/* {board && board.length > 0 ? (
          board.map((item, index) => (
            <Link key={index} href={`workspace/board/${item._id}`}>
              <div className="hover:-translate-y-2 transform transition">
                <WorkspaceCard board={item} />
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-3 flex justify-center items-center">
            <span className="text-slate-500">No board found</span>
          </div>
        )} */}
        {board.map((item, index) => (
          <Link key={index} href={`workspace/board/${item._id}`}>
            <div className="hover:-translate-y-2 transform transition">
              <WorkspaceCard board={item} />
            </div>
          </Link>
        ))}
      </div>
      {board && <SectionThree />}
    </section>
  ) : (
    <EmptyPage subject="project" />
  );
};

export default SectionTwo;
