'use client';

import Link from 'next/link';
import WorkspaceCard from './WorkspaceCard';

const SectionTwo = () => {
  return (
    <section className="grid grid-cols-3 gap-x-5 gap-y-7">
      <Link href={'workspace/board/1'}>
        <div className=" hover:-translate-y-2 transform transition">
          <WorkspaceCard />
        </div>
      </Link>
      <Link href={'workspace/board/1'}>
        <div className=" hover:-translate-y-2 transform transition">
          <WorkspaceCard />
        </div>
      </Link>
      <Link href={'workspace/board/1'}>
        <div className=" hover:-translate-y-2 transform transition">
          <WorkspaceCard />
        </div>
      </Link>
      <Link href={'workspace/board/1'}>
        <div className=" hover:-translate-y-2 transform transition">
          <WorkspaceCard />
        </div>
      </Link>
      <Link href={'workspace/board/1'}>
        <div className=" hover:-translate-y-2 transform transition">
          <WorkspaceCard />
        </div>
      </Link>
      <Link href={'workspace/board/1'}>
        <div className=" hover:-translate-y-2 transform transition">
          <WorkspaceCard />
        </div>
      </Link>
    </section>
  );
};

export default SectionTwo;
