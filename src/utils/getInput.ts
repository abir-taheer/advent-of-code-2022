import axios from "axios";
import { AOC_SESSION_ID } from "../constants";

export const getInput = async (day: number) => {
  const { data } = await axios<string>(
    `https://adventofcode.com/2022/day/${day}/input`,
    {
      headers: {
        Cookie: `session=${AOC_SESSION_ID}`,
      },
    }
  );

  return data;
};
