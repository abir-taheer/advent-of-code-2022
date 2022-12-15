import { getInput } from "../utils/getInput";

const day = 1;

const parseInput = async () => {
  const raw = await getInput(day);
  return raw.split("\n");
};

const part1 = async () => {
  const input = await parseInput();
};

const part2 = async () => {
  const input = await parseInput();
};

part1().then((p1) => console.log({ p1 }));
part2().then((p2) => console.log({ p2 }));
