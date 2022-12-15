import { getInput } from "../utils/getInput";
import { oneRangeContainsAnther, rangeHasOverlap } from "../utils/range";

const day = 4;

const parseInput = async () => {
  const raw = await getInput(day);
  return raw
    .split("\n")
    .filter(Boolean)
    .map((a) => a.split(",").map((b) => b.split("-").map(Number) as Range));
};

type Range = [number, number];

const part1 = async () => {
  const input = await parseInput();
  const onesWithOverlap = input.filter((row) =>
    oneRangeContainsAnther(row[0], row[1])
  );
  return onesWithOverlap.length;
};

const part2 = async () => {
  const input = await parseInput();

  const onesWithOverlap = input.filter((row) =>
    rangeHasOverlap(row[0], row[1])
  );

  return onesWithOverlap.length;
};

part1().then((p1) => console.log({ p1 }));
part2().then((p2) => console.log({ p2 }));
