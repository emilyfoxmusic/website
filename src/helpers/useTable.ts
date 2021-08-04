import { useState } from 'react';

type DataObject = {
  [K: string]: boolean | string | number;
};

type TableData<TData extends DataObject> = TData[];

type ProcessedTableData<TData> = {
  data: TData[];
  sort: {
    sortByKey: (key: keyof TData) => void;
    switchSortDirection: () => void;
    setSort: (key: keyof TData, ascending: boolean) => void;
    toggleSort: (key: keyof TData, defaultAscending?: boolean) => void;
  };
  pagination: {
    currentPage: number;
    lastPage: number;
    setNextPage: () => void;
    setPreviousPage: () => void;
    setPage: (page: number) => void;
  };
};

const compareFn = <TData extends DataObject>(
  a: TData,
  b: TData,
  sortBy: keyof TData
): number => {
  const aVal = a[sortBy];
  const bVal = b[sortBy];
  switch (typeof aVal) {
    case 'number':
      return aVal - (bVal as number);
    case 'string':
      return aVal.localeCompare(bVal as string);
    case 'boolean':
      if (aVal === bVal) {
        return 0;
      }
      return aVal ? 1 : -1;
    default:
      throw new Error('Sort key of of unsupported type.');
  }
};

const useTable = <TData extends DataObject>(
  data: TableData<TData>,
  defaultSortKey: keyof TData,
  pageSize?: number
): ProcessedTableData<TData> => {
  const [sortBy, setSortBy] = useState({
    key: defaultSortKey,
    ascending: true,
  });

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

  const sortedData = data.sort((a, b) =>
    sortBy.ascending
      ? compareFn(a, b, sortBy.key)
      : -compareFn(a, b, sortBy.key)
  );

  const sortByKey = (key: keyof TData): void =>
    setSortBy(state => ({ ...state, key }));

  const switchSortDirection = (): void =>
    setSortBy(state => ({ ...state, ascending: !!state.ascending }));

  const setSort = (key: keyof TData, ascending: boolean): void =>
    setSortBy({ key, ascending });

  const toggleSort = (key: keyof TData, defaultAscending?: boolean): void =>
    setSortBy(state => {
      if (state.key === key) {
        return { ...state, ascending: !state.ascending };
      }
      return { key, ascending: defaultAscending ?? true };
    });

  return {
    data: pageSize
      ? sortedData.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      : sortedData,
    sort: {
      sortByKey,
      switchSortDirection,
      setSort,
      toggleSort,
    },
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
