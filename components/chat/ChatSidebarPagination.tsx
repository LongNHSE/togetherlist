import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ChatSidebarPagination = ({ users, onPageChange, currentPage }: any) => {
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  return (
    <>
      {totalPages > 1 && (
        <div className="border-t border-slate-300 py-2">
          <Pagination>
            <PaginationContent className="flex items-center">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    currentPage > 1 && onPageChange(currentPage - 1)
                  }
                  className={currentPage > 1 ? '' : 'invisible'}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={() => onPageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                  }
                  className={currentPage < totalPages ? '' : 'invisible'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default ChatSidebarPagination;
