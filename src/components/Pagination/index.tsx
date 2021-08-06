import React from 'react';

import { trackAction } from 'helpers/goatcounter';
import { PaginationInfo } from 'helpers/useTable';

import {
  Label,
  PaginationButton,
  PaginationList,
  PaginationListItem,
} from './styles';

const Pagination: React.FC<PaginationInfo> = ({
  currentPage,
  lastPage,
  setPage,
}) => {
  if (lastPage <= 1) {
    return null;
  }

  const allPages = [...Array(lastPage).keys()].map(n => n + 1);
  const pagesWithButtons = [
    1,
    lastPage,
    currentPage,
    currentPage + 1,
    currentPage - 1,
  ];

  return (
    <nav aria-label="Pagination navigation">
      <Label aria-hidden>Go to page:</Label>
      <PaginationList>
        {allPages
          .filter(page => pagesWithButtons.includes(page))
          .map(page => (
            <>
              {page === lastPage && currentPage < lastPage - 2 && (
                <span>...</span>
              )}
              <PaginationListItem key={page}>
                <PaginationButton
                  current={page === currentPage}
                  as="a"
                  href="#"
                  onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault();
                    setPage(page);
                    trackAction(`Pagination - page ${page}`);
                  }}
                  aria-label={`Go to page ${page}`}>
                  {page}
                </PaginationButton>
              </PaginationListItem>
              {page === 1 && currentPage > 3 && <span>...</span>}
            </>
          ))}
      </PaginationList>
    </nav>
  );
};

export default Pagination;
