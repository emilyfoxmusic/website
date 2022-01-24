import React from 'react';

import { VisuallyHiddenPaginationText } from './styles';

type ScreenreaderPaginationProps = {
  pageSize: number;
  currentPage: number;
  total: number;
  search: string;
  sort: string;
  announceChanges?: boolean;
};

const ScreenreaderPagination: React.FC<ScreenreaderPaginationProps> = ({
  pageSize,
  currentPage,
  total,
  search,
  sort,
  announceChanges,
}) => {
  const firstResult = Math.max(pageSize * (currentPage - 1) + 1, 0);
  const lastResult = Math.min(pageSize * currentPage, total);
  return (
    <VisuallyHiddenPaginationText
      aria-live={announceChanges ? 'polite' : undefined}>
      Showing results {firstResult} to {lastResult} of {total} sorted by {sort}
      {search ? ` with filter '${search}'` : ''}
    </VisuallyHiddenPaginationText>
  );
};

export default ScreenreaderPagination;
