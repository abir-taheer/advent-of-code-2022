export type Direction = "up" | "down" | "left" | "right";
export type RotationDegree = 0 | 90 | 180 | 270;

export class Grid<T extends Cell<any>> {
  private rows: T[][] = [];

  getRows(): T[][] {
    return this.rows;
  }

  get(row: number, col: number) {
    const rowArr = this.rows[row];

    if (!rowArr) {
      return null;
    }

    return this.rows[row][col] || null;
  }

  getColumns(): T[][] {
    return this.rows.map((row, rowIndex) =>
      row.map((_, colIndex) => this.get(colIndex, rowIndex)!)
    );
  }

  addCell(row: number, cell: T) {
    if (!this.rows[row]) {
      this.rows[row] = [];
    }

    this.rows[row].push(cell);
  }

  updateCellLoci() {
    this.rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => cell.setLocation(rowIndex, colIndex));
    });
  }

  rotate(degrees: RotationDegree) {
    if (degrees === 90) {
      this.rows = this.getColumns().map((col) => col.reverse());
    }

    if (degrees === 180) {
      this.rows = this.rows.reverse().map((row) => row.reverse());
    }

    if (degrees === 270) {
      this.rows = this.getColumns().reverse();
    }

    this.updateCellLoci();

    return this.rows;
  }
}

export type CellProps<T> = {
  value: T;
  row: number;
  col: number;
  grid: Grid<Cell<T>>;
};

export class Cell<T> {
  private value: T | null = null;
  private row: number = 0;
  private col: number = 0;
  private grid: Grid<Cell<T>> | null = null;

  constructor({ value, row, col, grid }: CellProps<T>) {
    this.value = value;
    this.row = row;
    this.col = col;
    this.grid = grid;
  }

  setLocation(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  getValue() {
    return this.value!;
  }

  getAdjacent(dir: Direction) {
    const row =
      dir === "up" ? this.row - 1 : dir === "down" ? this.row + 1 : this.row;
    const col =
      dir === "right" ? this.col + 1 : dir === "left" ? this.col - 1 : this.col;

    return this.grid!.get(row, col);
  }
}
