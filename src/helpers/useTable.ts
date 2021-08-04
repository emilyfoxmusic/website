import { useState } from 'react';

type DataObject = {
  [K: string]: boolean | string | number;
};

type TableData<TData extends DataObject> = TData[];

export type SortInfo<TData> = {
  currentSort: {
    key: keyof TData;
    ascending: boolean;
  };
  sortByKey: (key: keyof TData) => void;
  switchSortDirection: () => void;
  setSort: (key: keyof TData, ascending: boolean) => void;
  toggleSort: (key: keyof TData, defaultAscending?: boolean) => void;
  ariaText: (
    key: keyof TData,
    label: string,
    switchDefaultOrder?: boolean,
    ascendingText?: string,
    descendingText?: string
  ) => string;
};

export type PaginationInfo = {
  currentPage: number;
  lastPage: number;
  setNextPage: () => void;
  setPreviousPage: () => void;
  setPage: (page: number) => void;
};

type ProcessedTableData<TData> = {
  data: TData[];
  sort: SortInfo<TData>;
  pagination: PaginationInfo;
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

const compareFn2 = <TData extends DataObject>(
  a: TData,
  b: TData,
  sortBy: keyof TData,
  thenBy: keyof TData
): number => {
  const aVal = a[sortBy];
  const bVal = b[sortBy];
  if (aVal === bVal) {
    return compareFn(a, b, thenBy);
  }
  return compareFn(a, b, sortBy);
};

const useTable = <TData extends DataObject>(
  data: TableData<TData>,
  defaultPrimarySortKey: keyof TData,
  secondarySortKey: keyof TData,
  pageSize?: number
): ProcessedTableData<TData> => {
  const [currentSort, setCurrentSort] = useState({
    key: defaultPrimarySortKey,
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
    currentSort.ascending
      ? compareFn2(a, b, currentSort.key, secondarySortKey)
      : -compareFn2(a, b, currentSort.key, secondarySortKey)
  );

  const sortByKey = (key: keyof TData): void =>
    setCurrentSort(state => ({ ...state, key }));

  const switchSortDirection = (): void =>
    setCurrentSort(state => ({ ...state, ascending: !!state.ascending }));

  const setSort = (key: keyof TData, ascending: boolean): void =>
    setCurrentSort({ key, ascending });

  const toggleSort = (key: keyof TData, defaultAscending?: boolean): void =>
    setCurrentSort(state => {
      if (state.key === key) {
        return { ...state, ascending: !state.ascending };
      }
      return { key, ascending: defaultAscending ?? true };
    });

  const ariaText = (
    key: keyof TData,
    label: string,
    switchDefaultOrder?: boolean,
    ascendingText?: string,
    descendingText?: string
  ): string =>
    currentSort.key === key
      ? `Sort by ${label} ${
          currentSort.ascending
            ? descendingText ?? 'descending'
            : ascendingText ?? 'ascending'
        }`
      : `Sort by ${label} ${
          switchDefaultOrder
            ? descendingText ?? 'descending'
            : ascendingText ?? 'ascending'
        }`;

  return {
    data: pageSize
      ? sortedData.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      : sortedData,
    sort: {
      currentSort,
      sortByKey,
      switchSortDirection,
      setSort,
      toggleSort,
      ariaText,
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
