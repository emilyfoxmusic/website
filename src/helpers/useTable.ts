import { useState } from 'react';

import { recursivelyCompareObjects } from './sort';

export type DataObject = {
  [K: string]: boolean | string | number;
};

type CurrentSort<TData> = {
  sortKey: keyof TData & string;
  sortOrder: 'ascending' | 'descending';
};

type TableData<TData extends DataObject> = TData[];

export type SortInfo<TData extends DataObject> = {
  currentSort: CurrentSort<TData>;
  toggleSort: (key: keyof TData & string) => void;
  ariaToggleText: (key: keyof TData & string) => string;
  currentSortText: string;
  ariaSort: (key: keyof TData) => 'ascending' | 'descending' | undefined;
  toggleDirection: (key: keyof TData) => 'ascending' | 'descending';
};

export type PaginationInfo = {
  currentPage: number;
  lastPage: number;
  totalResults: number;
  pageSize: number | undefined;
  setNextPage: () => void;
  setPreviousPage: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

type ProcessedTableData<TData extends DataObject> = {
  data: TData[];
  sort: SortInfo<TData>;
  pagination: PaginationInfo;
};

export type SortConfig<TData extends DataObject> = {
  [K in keyof TData]?: {
    label?: string;
    otherSortKeys: (keyof TData)[];
    defaultOrder?: 'ascending' | 'descending';
    ascendingText?: string;
    descendingText?: string;
  };
};

const useTable = <TData extends DataObject>(
  data: TableData<TData>,
  sortConfig: SortConfig<TData>,
  defaultSortKey: keyof TData & string,
  filterFn?: (item: TData) => boolean,
  defaultPageSize?: number
): ProcessedTableData<TData> => {
  const [currentSort, setCurrentSort] = useState<CurrentSort<TData>>({
    sortKey: defaultSortKey,
    sortOrder: sortConfig[defaultSortKey]?.defaultOrder ?? 'ascending',
  });
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredData = filterFn ? data.filter(filterFn) : data;

  const filteredAndSortedData = filteredData.sort((a, b) => {
    const comparison = recursivelyCompareObjects(
      a,
      b,
      currentSort.sortKey,
      sortConfig[currentSort.sortKey]?.otherSortKeys ?? []
    );
    return currentSort.sortOrder === 'ascending' ? comparison : -comparison;
  });

  const lastPage = pageSize ? Math.ceil(filteredData.length / pageSize) : 1;

  const adjustedCurrentPage = currentPage > lastPage ? lastPage : currentPage;

  const setNextPage = (): void =>
    setCurrentPage(state =>
      adjustedCurrentPage + 1 <= lastPage ? adjustedCurrentPage + 1 : state
    );

  const setPreviousPage = (): void =>
    setCurrentPage(state =>
      adjustedCurrentPage - 1 > 0 ? adjustedCurrentPage - 1 : state
    );

  const setPage = (page: number): void => {
    if (page < 0 || page > lastPage) {
      throw new Error(`Page ${page} doesn't exist!`);
    }
    setCurrentPage(page);
  };

  const toggleSort = (key: keyof TData & string): void =>
    setCurrentSort(state => {
      if (state.sortKey === key) {
        return {
          ...state,
          sortOrder:
            state.sortOrder === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return {
        sortKey: key,
        sortOrder: sortConfig[key]?.defaultOrder ?? 'ascending',
      };
    });

  const withBrackets = (explanatoryText: string | undefined): string =>
    explanatoryText ? ` (${explanatoryText})` : '';

  const ariaToggleText = (key: keyof TData & string): string =>
    currentSort.sortKey === key
      ? `Sort by ${sortConfig[key]?.label ?? key} ${
          currentSort.sortOrder === 'ascending'
            ? `descending${withBrackets(sortConfig[key]?.descendingText)}`
            : `ascending${withBrackets(sortConfig[key]?.ascendingText)}`
        }`
      : `Sort by ${sortConfig[key]?.label ?? key} ${
          sortConfig[key]?.defaultOrder === 'ascending'
            ? `ascending${withBrackets(sortConfig[key]?.ascendingText)}`
            : `descending${withBrackets(sortConfig[key]?.descendingText)}`
        }`;

  const currentSortText = `${
    sortConfig[currentSort.sortKey]?.label ?? currentSort.sortKey
  }, ${currentSort.sortOrder}${
    currentSort.sortOrder === 'ascending'
      ? withBrackets(sortConfig[currentSort.sortKey]?.ascendingText)
      : withBrackets(sortConfig[currentSort.sortKey]?.descendingText)
  }`;

  const ariaSort = (key: keyof TData): 'ascending' | 'descending' | undefined =>
    currentSort.sortKey === key ? currentSort.sortOrder : undefined;

  const toggleDirection = (key: keyof TData): 'ascending' | 'descending' =>
    currentSort.sortKey === key
      ? currentSort.sortOrder
      : sortConfig[key]?.defaultOrder ?? 'ascending';

  const updatePageSize = (size: number): void => {
    if (!pageSize) {
      return;
    }
    const firstResultOnPage = pageSize * (adjustedCurrentPage - 1);
    const updatedPage = Math.ceil((firstResultOnPage + 1) / size);

    setPageSize(size);
    setCurrentPage(updatedPage);
  };

  return {
    data: pageSize
      ? filteredAndSortedData.slice(
          pageSize * (adjustedCurrentPage - 1),
          pageSize * adjustedCurrentPage
        )
      : filteredAndSortedData,
    sort: {
      currentSort,
      toggleSort,
      ariaToggleText,
      currentSortText,
      ariaSort,
      toggleDirection,
    },
    pagination: {
      currentPage: adjustedCurrentPage,
      lastPage,
      totalResults: filteredData.length,
      pageSize,
      setNextPage,
      setPreviousPage,
      setPage,
      setPageSize: updatePageSize,
    },
  };
};

export default useTable;
