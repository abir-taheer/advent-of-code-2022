export const groupItems = <T>(items: T[], numPerGroup: number) => {
  const result: T[][] = [];

  items.forEach((item, index) => {
    const bucket = Math.floor(index / numPerGroup);
    if (!result[bucket]) {
      result[bucket] = [];
    }

    result[bucket].push(item);
  });

  return result;
};
