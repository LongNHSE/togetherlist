'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import boardApiRequest from '@/apiRequest/board/board.api';
import dynamic from 'next/dynamic';
import SectionThree from './SectionThree';
import SectionOne from './SectionOne';
import SkeletonCard from '../SkeletonCard';
import EmptyPage from '../EmptyPage';
import { BoardType } from '@/lib/schema/board/board.schema';
import CreateBoard from '../board/CreateBoard';
import { useAppContext } from '@/context/Provider';
import LoadingMini from '../LoadingMini';

const WorkspaceCard = dynamic(() => import('./WorkspaceCard2'), {
  ssr: false,
  loading: () => <SkeletonCard />,
});

const SectionTwo = () => {
  const { currentWorkspace } = useAppContext();
  const [board, setBoard] = useState<BoardType[]>([]);
  const { loading, setLoading } = useAppContext();

  const loadBoard = async () => {
    try {
      setLoading(true);
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

  return loading ? (
    <LoadingMini />
  ) : board && board.length > 0 ? (
    <section className="flex flex-col justify-between  h-[80vh]">
      {/* Section One */}
      <div className="flex flex-col gap-3">
        <SectionOne />
        <div className="grid grid-cols-4 gap-6">
          {board.map((item, index) => (
            <Link key={index} href={`board/${item._id}`}>
              <div className="hover:-translate-y-2 transform transition">
                <WorkspaceCard board={item} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      {board && <SectionThree />}
    </section>
  ) : (
    <div className="flex flex-col justify-center items-center gap-8">
      <EmptyPage subject="project" />
      <CreateBoard />
    </div>
  );
};

export default SectionTwo;
