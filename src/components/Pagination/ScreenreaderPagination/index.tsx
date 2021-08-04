import React from 'react';

import { VisuallyHiddenPaginationText } from './styles';

type ScreenreaderPaginationProps = {
  pageSize: number;
  currentPage: number;
  total: number;
  announceChanges?: boolean;
};

const ScreenreaderPagination: React.FC<ScreenreaderPaginationProps> = ({
  pageSize,
  currentPage,
  total,
  announceChanges,
}) => {
  const firstResult = pageSize * (currentPage - 1) + 1;
  const lastResult = Math.min(pageSize * currentPage, total);
  return (
    <VisuallyHiddenPaginationText
      aria-live={announceChanges ? 'polite' : undefined}>
      Showing results {firstResult} to {lastResult} of {total}
    </VisuallyHiddenPaginationText>
  );
};

export default ScreenreaderPagination;
