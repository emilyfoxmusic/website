import React, { ReactElement } from 'react';

import { trackAction } from 'helpers/goatcounter';
import { DataObject, SortInfo } from 'helpers/useTable';

import { CurrentArrow, SortButtonStyle } from './styles';

type SortButtonProps<TData extends DataObject> = {
  sort: SortInfo<TData>;
  sortKey: keyof TData & string;
  onSort: () => void;
};

const SortButton = <TData extends DataObject>({
  sort,
  sortKey,
  onSort,
}: SortButtonProps<TData>): ReactElement => {
  const active = sort.currentSort.sortKey === sortKey;
  return (
    <SortButtonStyle
      type="button"
      $active={active}
      onClick={() => {
        sort.toggleSort(sortKey);
        onSort();
        trackAction(`Toggle sort by ${sortKey}`);
      }}
      aria-label={sort.ariaToggleText(sortKey)}>
      <CurrentArrow
        aria-hidden
        $ascending={sort.toggleDirection(sortKey) === 'ascending'}
      />
    </SortButtonStyle>
  );
};

export default SortButton;
