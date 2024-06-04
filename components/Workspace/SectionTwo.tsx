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
import { ConfirmDelete } from '../modal/ConfirmDelete';

const WorkspaceCard = dynamic(() => import('./WorkspaceCard'), {
  ssr: false,
  loading: () => <SkeletonCard />,
});

const SectionTwo = () => {
  const { currentWorkspace } = useAppContext();
  const [board, setBoard] = useState<BoardType[]>([]);
  const { loading, setLoading } = useAppContext();

  const [deleteBoard, setDeleteBoard] = useState(false);
  const [deleteBoardId, setDeleteBoardId] = useState('');

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

  const deleteBoardModal = (id: string | undefined) => {
    if (id) {
      setDeleteBoardId(id);
      setDeleteBoard(true);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      setLoading(true);
      if (deleteBoardId) {
        await boardApiRequest.deleteBoard(deleteBoardId);
        loadBoard();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setDeleteBoard(false);
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
      <ConfirmDelete
        isOpen={deleteBoard}
        closeModal={() => setDeleteBoard(false)}
        func={handleDeleteBoard}
        prop="board"
      />
      {/* Section One */}
      <div className="flex flex-col gap-3">
        <SectionOne loadBoard={loadBoard} />
        <div className="grid grid-cols-4 gap-6">
          {board.map((item, index) => (
            <Link key={index} href={`/workspace/board/${item._id}`}>
              <div className="hover:-translate-y-2 transform transition">
                <WorkspaceCard
                  board={item}
                  deleteBoard={() => deleteBoardModal(item._id)}
                />
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
      <CreateBoard loadBoard={loadBoard} />
    </div>
  );
};

export default SectionTwo;
