export type Range = [number, number];

export const rangeHasOverlap = (a: Range, b: Range) => {
  const aContainsBStart = a[0] <= b[0] && a[1] >= b[0];
  const aContainsBEnd = a[0] <= b[1] && a[1] >= b[1];
  const bContainsAStart = b[0] <= a[0] && b[1] >= a[0];
  const bContainsAEnd = b[0] <= a[1] && b[1] >= a[1];

  return aContainsBStart || aContainsBEnd || bContainsAStart || bContainsAEnd;
};

export const oneRangeContainsAnther = (a: Range, b: Range) => {
  const aContainsB = a[0] <= b[0] && a[1] >= b[1];
  const bContainsA = b[0] <= a[0] && b[1] >= a[1];

  return aContainsB || bContainsA;
};
