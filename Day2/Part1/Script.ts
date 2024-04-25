import * as fs from "fs";
import * as readline from "readline";
import { setFlagsFromString } from "v8";

function isGamePossible(
  cubesGrabs: string[],
  possibleRed: number,
  possibleGreen: number,
  possibleblue: number
) {
  for (const cubeGrab of cubesGrabs) {
    let cubes: string[] = cubeGrab.split(", ");
    for (const cube of cubes) {
        let cubeTurn: string[] = cube.trim().split(' ');
        if(cubeTurn[1] == 'red'){
            if(parseInt(cubeTurn[0]) > possibleRed) return false;
        }
        if(cubeTurn[1] == 'green'){
            if(parseInt(cubeTurn[0]) > possibleGreen) return false;
        }
        else{
            if(parseInt(cubeTurn[0]) > possibleblue) return false;
        }
    }
  }
  return true;
}

function getPossibleGames(filePath: string) {
  return new Promise<string[]>((resolve, reject) => {
    const resultValues: string[] = [];
    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line: string) => {
      let games: string[] = line.split(":");
      let cubes: string[] = games[1].split(";");
      if (isGamePossible(cubes, 12, 13, 14)) {
        resultValues.push(games[0].split(" ")[1]);
      }
    });

    rl.on("close", () => {
      resolve(resultValues);
      getSomme(resultValues);
    });

    readStream.on("error", (error: Error) => {
      reject(error);
    });
  });
}

function getSomme(resultValues) {
  var result = 0;
  for (
    var _i = 0, resultValues_1 = resultValues;
    _i < resultValues_1.length;
    _i++
  ) {
    var value = resultValues_1[_i];
    result += parseInt(value);
  }
  console.log(result);
}

getPossibleGames("D:\\ESISA\\Adventure of code\\Day2\\input.txt");
