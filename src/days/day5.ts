import { getInput } from "../utils/getInput";

const day = 5;

const parseInput = async () => {
  const raw = await getInput(day);

  const [rawChart, rawInstructions] = raw.split("\n\n");
  const horizontalChart = rawChart
    .split("\n")
    .map((line) => line.replace(/[0-9]/g, "").trim())
    .filter(Boolean)
    .map((line) => line.trim().split(/ {1,4}/g));

  const chart = Array.from(Array(10), (_, i) =>
    horizontalChart.map((a) => a[i - 1]).filter(Boolean)
  );

  const instructions = rawInstructions
    .split("\n")
    .filter(Boolean)
    .map((a) =>
      a
        .split(" ")
        .map(Number)
        .filter((a) => !Number.isNaN(a))
    );

  return { chart, instructions };
};

const part1 = async () => {
  const { chart, instructions } = await parseInput();

  const chartCopy = JSON.parse(JSON.stringify(chart)) as typeof chart;

  instructions.forEach(([amount, from, to]) => {
    const items = chartCopy[from].splice(0, amount).reverse();

    chartCopy[to].unshift(...items);
  });

  return chartCopy.map((a) => a[0]).filter(Boolean);
};

const part2 = async () => {
  const { chart, instructions } = await parseInput();

  const chartCopy = JSON.parse(JSON.stringify(chart)) as typeof chart;

  instructions.forEach(([amount, from, to]) => {
    const items = chartCopy[from].splice(0, amount);

    chartCopy[to].unshift(...items);
  });

  return chartCopy.map((a) => a[0]).filter(Boolean);
};

part1().then((p1) => console.log({ p1 }));
part2().then((p2) => console.log({ p2 }));
