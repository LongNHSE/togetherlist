import React from 'react';

interface ChatSidebarPaginationProps {
  items: any[];
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const ChatSidebarPagination = ({
  items,
  currentPage,
  onPageChange,
}: ChatSidebarPaginationProps) => {
  const totalPages = Math.ceil(items.length / 10);

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex justify-center py-3">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={`px-2 py-1 mx-1 ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ChatSidebarPagination;
