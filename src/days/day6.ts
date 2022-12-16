import { getInput } from "../utils/getInput";

const day = 6;

const parseInput = async () => {
  const raw = await getInput(day);
  return raw.replace(/\s+/g, "");
};

const part1 = async () => {
  const input = await parseInput();

  for (let i = 0; i < input.length - 4; i++) {
    const marker = input.substring(i, i + 4);
    const chars = new Set(marker);

    if (chars.size === 4) {
      return i + 4;
    }
  }
};

const part2 = async () => {
  const input = await parseInput();

  for (let i = 0; i < input.length - 14; i++) {
    const marker = input.substring(i, i + 14);
    const chars = new Set(marker);

    if (chars.size === 14) {
      return i + 14;
    }
  }
};

part1().then((p1) => console.log({ p1 }));
part2().then((p2) => console.log({ p2 }));
