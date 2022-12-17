export const rotate2DArrayClockwise = <T>(array: T[][]): T[][] => {
  return Array.from(Array(array[0].length), (_, i) =>
    array.map((row) => row[i]).reverse()
  );
};
