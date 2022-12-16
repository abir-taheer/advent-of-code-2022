import { sum } from "./sum";

export type Item = File | Directory;

export class Directory {
  private size: number = 0;
  private sizeInitialized: boolean = false;

  readonly items: { [name: string]: Item } = {};

  name: string = "";
  parent: Directory | null = null;

  constructor({ name, parent }: { name: string; parent: Directory | null }) {
    this.name = name;
    this.parent = parent;
  }

  addItem(file: Item) {
    this.items[file.name] = file;
  }

  getSize(): number {
    if (!this.sizeInitialized) {
      this.size = this.calculateSize();
      this.sizeInitialized = true;
    }

    return this.size;
  }

  calculateSize(): number {
    return (
      sum(this.getFiles().map((file) => file.size)) +
      sum(this.getDirectories().map((dir) => dir.getSize()))
    );
  }

  getDirectories(): Directory[] {
    return Object.keys(this.items)
      .map((name) => this.items[name])
      .filter((item) => item instanceof Directory) as Directory[];
  }

  getFiles(): File[] {
    return Object.keys(this.items)
      .map((name) => this.items[name])
      .filter((item) => item instanceof File) as File[];
  }
}

export class File {
  readonly size: number = 0;
  readonly name: string = "";
  readonly parent: Directory | null = null;

  constructor({
    name,
    size,
    parent,
  }: {
    name: string;
    size: number;
    parent: Directory;
  }) {
    this.size = size;
    this.name = name;
    this.parent = parent;
  }
}

export class Terminal {
  private path: string = "/";
  private root: Directory = new Directory({ name: "/", parent: null });
  private head: Directory = this.root;

  constructor() {}

  cd(dir: string) {
    if (dir === "/") {
      this.path = "/";
      this.head = this.root;
    } else if (dir === "..") {
      if (!this.head.parent) {
        throw new Error("Cannot go up from root");
      }

      this.path = this.path.split("/").slice(0, -1).join("/");
      this.head = this.head.parent;
    } else {
      const newHead = this.head.items[dir];
      if (!newHead) {
        throw new Error(`No such directory: ${dir}`);
      }

      if (newHead instanceof File) {
        throw new Error(`Not a directory: ${dir}`);
      }

      this.path = `${this.path}/${dir}`;
      this.head = newHead;
    }
  }

  getHead(): Directory {
    return this.head;
  }

  getRoot(): Directory {
    return this.root;
  }

  getPath(): string {
    return this.path;
  }
}
