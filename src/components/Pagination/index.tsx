import React from 'react';

import { PaginationInfo } from 'helpers/useTable';

import { PaginationButton, PaginationList, PaginationListItem } from './styles';

const Pagination: React.FC<PaginationInfo> = ({
  currentPage,
  lastPage,
  setPage,
}) => {
  if (lastPage <= 1) {
    return null;
  }

  const pagesWithButtons = [...Array(lastPage).keys()].map(n => n + 1);

  return (
    <nav aria-label="Pagination navigation">
      <span aria-hidden>Go to page:</span>
      <PaginationList>
        {pagesWithButtons.map(page => (
          <PaginationListItem key={page}>
            <PaginationButton
              current={page === currentPage}
              as="a"
              href="#"
              onClick={(e: { preventDefault: () => void }) => {
                e.preventDefault();
                setPage(page);
              }}
              aria-label={`Go to page ${page}`}>
              {page}
            </PaginationButton>
          </PaginationListItem>
        ))}
      </PaginationList>
    </nav>
  );
};

export default Pagination;
