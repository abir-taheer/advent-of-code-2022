# Advent of Code 2022

Welcome to my repository for the 2022 Advent of Code challenge! Advent of Code is an annual event where programmers around the world attempt to solve a series of small programming challenges, one for each day in the month of December leading up to Christmas.

This repository contains my solutions to the Advent of Code challenges, written in TypeScript. I chose to use TypeScript for these solutions because I wanted to prioritize code readability and structure in my solutions rather than leaderboard performance. 

Each solution is contained in its own file in the `src/days/` directory, named according to the day of the Advent of Code challenge it corresponds to. Within each file, you will find the TypeScript source code for my solutions to both parts. There's also a `utils` directory with accompanying tools and helper functions that I wrote to make it easier for me to solve the challenges. 

There's also a helper function in the `utils` directory called [`getInput`](https://github.com/abir-taheer/advent-of-code-2022/blob/main/src/utils/getInput.ts) that automatically fetches your problem input for the day that you provide as an argument from the Advent of Code website. 
1. It uses the value of your session cookie to authenticate as you and fetch the correct input. 
2. You can find your session cookie by [inspecting the network requests](https://superuser.com/questions/1486002/how-do-i-see-request-cookies-in-chrome) made by your browser when you visit the Advent of Code website. 
3. Once you find it, set it as the value of the `SESSION_COOKIE` environment variable. You can add a `.env` file to the root of the project and set the value there.

I hope that my solutions will be helpful to you as you work on the Advent of Code challenges, or as you simply try to improve your skills in programming. If you have any questions or comments, feel free to reach out to me through the repository's issue tracker.

Happy coding!



