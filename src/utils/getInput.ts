import axios from "axios";
import { AOC_SESSION_ID } from "../constants";

const cache: {
  [day: number]: string;
} = {};

export const getInput = async (day: number) => {
  if (cache[day]) {
    return cache[day];
  }

  const { data } = await axios<string>(
    `https://adventofcode.com/2022/day/${day}/input`,
    {
      headers: {
        Cookie: `session=${AOC_SESSION_ID}`,
      },
    }
  );

  cache[day] = data;

  return data;
};
