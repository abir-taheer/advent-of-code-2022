import { getInput } from "../utils/getInput";

const parseInput = async () => {
  const raw = await getInput(2);

  return raw
    .split("\n")
    .filter(Boolean)
    .map((a) => a.split(" "));
};

const part1 = async () => {
  const input = await parseInput();

  let score = 0;

  input.forEach(([opponent, you]) => {
    if (you === "X") {
      score += 1;

      if (opponent === "A") {
        score += 3;
      } else if (opponent === "C") {
        score += 6;
      }
    }

    if (you === "Y") {
      score += 2;

      if (opponent === "B") {
        score += 3;
      } else if (opponent === "A") {
        score += 6;
      }
    }

    if (you === "Z") {
      score += 3;

      if (opponent === "C") {
        score += 3;
      } else if (opponent === "B") {
        score += 6;
      }
    }
  });

  return score;
};

const part2 = async () => {
  const input = await parseInput();

  let score = 0;

  input.forEach(([opponent, you]) => {
    if (you === "X") {
      // you lost
      score += opponent === "A" ? 3 : opponent === "B" ? 1 : 2;
    } else if (you === "Y") {
      score += 3;

      score += opponent === "A" ? 1 : opponent === "B" ? 2 : 3;
    } else if (you === "Z") {
      score += 6;

      score += opponent === "A" ? 2 : opponent === "B" ? 3 : 1;
    }
  });

  return score;
};

part1().then(console.log);
part2().then(console.log);
