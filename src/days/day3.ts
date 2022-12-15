import { getInput } from "../utils/getInput";
import { groupItems } from "../utils/groupArrays";

const day = 3;

const parseInput = async (numSacks: number) => {
  const raw = await getInput(day);

  return raw
    .split("\n")
    .filter(Boolean)
    .map((row) =>
      Array.from(Array(numSacks), (_, i) =>
        row.slice(
          Math.ceil((row.length * i) / numSacks),
          Math.ceil((row.length * (i + 1)) / numSacks)
        )
      )
    );
};

const getLetterScore = (letter: string) => {
  let bonus = 0;
  if (letter.toUpperCase() === letter) {
    bonus += 26;
  }

  return letter.toLowerCase().charCodeAt(0) - 96 + bonus;
};

const part1 = async () => {
  const input = await parseInput(2);

  let sum = 0;
  input.forEach(([left, right]) => {
    const leftCharSet = new Set(left);
    const rightCharSet = new Set(right);
    const common = Array.from(leftCharSet).filter((char) =>
      rightCharSet.has(char)
    );

    sum += getLetterScore(common[0]);
  });

  return sum;
};

const part2 = async () => {
  const input = await parseInput(1);

  let sum = 0;
  groupItems(input, 3).forEach(([[first], [second], [third]]) => {
    const firstCharSet = new Set(first);
    const secondCharSet = new Set(second);
    const thirdCharSet = new Set(third);

    const common = Array.from(firstCharSet).filter(
      (char) => secondCharSet.has(char) && thirdCharSet.has(char)
    );

    sum += getLetterScore(common[0]);
  });

  return sum;
};

part1().then((p1) =>
  console.log({
    p1,
  })
);
part2().then((p2) => console.log({ p2 }));
