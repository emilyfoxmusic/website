const compareByKey = <TData extends Record<string, number | string | boolean>>(
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

export const recursivelyCompareObjects = <
  TData extends Record<string, number | string | boolean>
>(
  a: TData,
  b: TData,
  sortBy: keyof TData,
  thenBy: (keyof TData)[]
): number => {
  const compare = compareByKey(a, b, sortBy);
  if (compare === 0 && thenBy.length) {
    return recursivelyCompareObjects(a, b, thenBy[0], thenBy.slice(1));
  }
  return compare;
};
