import { useState } from 'react';

type TableData<TData extends Record<string, number | string>> = TData[];

type ProcessedTableData<TData> = {
  data: TData[];
  setSortBy: (sortKey: keyof TData) => void;
  pagination: {
    currentPage: number;
    lastPage: number;
    setNextPage: () => void;
    setPreviousPage: () => void;
    setPage: (page: number) => void;
  };
};

const useTable = <TData extends Record<string, number | string>>(
  data: TableData<TData>,
  defaultSortKey: keyof TData,
  pageSize = 20
): ProcessedTableData<TData> => {
  const [sortBy, setSortBy] = useState<keyof TData>(defaultSortKey);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastPage = Math.ceil(data.length / pageSize);

  const setNextPage = (): void =>
    setCurrentPage(state => (state + 1 <= lastPage ? state + 1 : state));

  const setPreviousPage = (): void =>
    setCurrentPage(state => (state - 1 > 0 ? state - 1 : state));

  const setPage = (page: number): void => {
    if (page < 0 || page > lastPage) {
      throw new Error(`Page ${page} doesn't exist!`);
    }
    setCurrentPage(page);
  };

  const currentPageData = data
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return typeof aVal === 'number'
        ? aVal - (bVal as number)
        : aVal.localeCompare(bVal as string);
    })
    .slice(pageSize * (currentPage - 1), pageSize * currentPage);

  return {
    data: currentPageData,
    setSortBy,
    pagination: {
      currentPage,
      lastPage,
      setNextPage,
      setPreviousPage,
      setPage,
    },
  };
};

export default useTable;
