import { getInput } from "../utils/getInput";
import { Directory, File, Terminal } from "../utils/filesystem";
import { sum } from "../utils/sum";

const day = 7;

const parseInput = async () => {
  const raw = await getInput(day);
  const input = raw.split("\n").filter(Boolean);
  const terminal = new Terminal();

  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    const addFiles = () => {
      while (i + 1 < input.length && !isCommand(input[i + 1])) {
        i++;
        const newLine = input[i];

        const [typeOrSize, name] = newLine.trim().split(" ");

        if (typeOrSize === "dir") {
          const dir = new Directory({ name, parent: terminal.getHead() });
          terminal.getHead().addItem(dir);
        } else {
          const size = parseInt(typeOrSize, 10);
          const file = new File({
            name,
            size,
            parent: terminal.getHead(),
          });
          terminal.getHead().addItem(file);
        }
      }
    };

    const lineIsCommand = isCommand(line);

    if (lineIsCommand) {
      const [$, command, ...args] = line.split(" ");

      if (command === "cd") {
        const [directory] = args;
        terminal.cd(directory);
      }

      if (command === "ls") {
        addFiles();
      }
    }
  }

  return terminal;
};

const isCommand = (line: string) => line.startsWith("$");

const part1 = async () => {
  const terminal = await parseInput();

  const dirs: Directory[] = [];
  const limit = 100000;

  const addValidDirectories = (dir: Directory) => {
    if (dir.getSize() <= limit) {
      dirs.push(dir);
    }
    dir.getDirectories().forEach(addValidDirectories);
  };

  addValidDirectories(terminal.getRoot());

  return sum(dirs.map((a) => a.getSize()));
};

const part2 = async () => {
  const terminal = await parseInput();
  const totalSize = 70000000;

  const requiredSpace = 30000000;
  const availableSpace = totalSize - terminal.getRoot().getSize();

  const deleteCandidates: Directory[] = [];

  const addDeleteCandidates = (dir: Directory) => {
    const size = dir.getSize();

    const newFreeSpace = availableSpace + size;

    if (newFreeSpace >= requiredSpace) {
      deleteCandidates.push(dir);
    }

    dir.getDirectories().forEach(addDeleteCandidates);
  };

  addDeleteCandidates(terminal.getRoot());

  deleteCandidates.sort((a, b) => a.getSize() - b.getSize());
  return deleteCandidates[0].getSize();
};

part1().then((p1) => console.log({ p1 }));
part2().then((p2) => console.log({ p2 }));
