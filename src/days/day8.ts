import { getInput } from "../utils/getInput";
import { Cell, Grid } from "../utils/Grid";

const day = 8;

type Direction = "right" | "down" | "left" | "up";

class TreeCell extends Cell<number> {
  private visibleFromOutside: boolean = false;

  setVisibility(visible: boolean) {
    this.visibleFromOutside = visible;
  }

  isVisibleFromOutside() {
    return this.visibleFromOutside;
  }

  isBlocked(dir: Direction) {
    const adjacent = this.getAdjacent(dir);

    if (!adjacent) {
      return false;
    }

    return adjacent!.getValue() >= this.getValue();
  }

  getTreesVisible(dir: Direction) {
    let adjacent = this.getAdjacent(dir);
    let trees = 0;

    while (adjacent) {
      trees++;
      if (adjacent.getValue() >= this.getValue()) {
        break;
      }

      adjacent = adjacent.getAdjacent(dir);
    }

    return trees;
  }

  getScenicScore() {
    return (
      this.getTreesVisible("right") *
      this.getTreesVisible("down") *
      this.getTreesVisible("left") *
      this.getTreesVisible("up")
    );
  }
}

const parseInput = async () => {
  const raw = await getInput(day);
  const grid = new Grid<TreeCell>();

  raw
    .split("\n")
    .filter(Boolean)
    .map((a, row) =>
      a
        .split("")
        .filter(Boolean)
        .forEach((val, col) =>
          grid.addCell(
            row,
            new TreeCell({
              value: Number(val),
              row,
              col,
              grid,
            })
          )
        )
    );

  return grid;
};

const checkVisibilityLeftToRight = (input: TreeCell[][]) => {
  input.forEach((row) => {
    let maxHeight = -1;
    row.forEach((cell) => {
      if (cell.getValue()! > maxHeight) {
        cell.setVisibility(true);
        maxHeight = cell.getValue()!;
      }
    });
  });
};

const part1 = async () => {
  const grid = await parseInput();

  checkVisibilityLeftToRight(grid.getRows());

  for (let i = 0; i < 3; i++) {
    grid.rotate(90);
    checkVisibilityLeftToRight(grid.getRows());
  }

  return grid
    .getRows()
    .flat()
    .filter((a) => a.isVisibleFromOutside()).length;
};

const part2 = async () => {
  const input = await parseInput();

  const scores = input
    .getRows()
    .flat()
    .map((cell) => cell.getScenicScore())
    .sort((a, b) => b - a);

  return Math.max(...scores);
};

part1().then((p1) => console.log({ p1 }));
part2().then((p2) => console.log({ p2 }));
