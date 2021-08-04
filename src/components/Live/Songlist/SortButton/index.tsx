import React, { ReactElement } from 'react';

import { SortInfo } from 'helpers/useTable';

import { CurrentArrow, SortButtonStyle } from './styles';

type SortButtonProps<TData> = {
  sort: SortInfo<TData>;
  sortKey: keyof TData;
  switchDefaultOrder?: boolean;
};

const SortButton = <TData,>({
  sort,
  sortKey,
  switchDefaultOrder,
}: SortButtonProps<TData>): ReactElement => {
  const active = sort.currentSort.key === sortKey;
  return (
    <SortButtonStyle
      type="button"
      $active={active}
      onClick={() => sort.toggleSort(sortKey, !switchDefaultOrder)}>
      <CurrentArrow
        aria-hidden
        $ascending={
          active
            ? switchDefaultOrder
              ? !sort.currentSort.ascending
              : sort.currentSort.ascending
            : true
        }
      />
    </SortButtonStyle>
  );
};

export default SortButton;
