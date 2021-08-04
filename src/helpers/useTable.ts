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
  pageSize?: number
): ProcessedTableData<TData> => {
  const [sortBy, setSortBy] = useState<keyof TData>(defaultSortKey);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastPage = pageSize ? Math.ceil(data.length / pageSize) : 1;

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

  const sortedData = data.sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    return typeof aVal === 'number'
      ? aVal - (bVal as number)
      : aVal.localeCompare(bVal as string);
  });

  return {
    data: pageSize
      ? sortedData.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      : sortedData,
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
