import { getInput } from "../utils/getInput";
import { sum } from "../utils/sum";

const parseInput = async () => {
  const raw = await getInput(1);
  return raw.split("\n\n").map((a) => a.split("\n").map(Number));
};

const part1 = async () => {
  const input = await parseInput();

  return Math.max(...input.map((elf) => sum(elf)));
};

const part2 = async () => {
  const input = await parseInput();

  return sum(
    input
      .map((elf) => sum(elf))
      .sort((a, b) => b - a)
      .slice(0, 3)
  );
};

part1().then(console.log);
part2().then(console.log);
