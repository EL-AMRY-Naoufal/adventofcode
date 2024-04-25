import * as fs from "fs";
import * as readline from "readline";
import { setFlagsFromString } from "v8";

function getPowerSetCubes(cubesGrabs: string[]) {
  let redMax = 0;
  let greenMax = 0;
  let blueMax = 0;
  for (const cubeGrab of cubesGrabs) {
    let cubes: string[] = cubeGrab.split(", ");
    for (const cube of cubes) {
      let cubeTurn: string[] = cube.trim().split(" ");
      if (cubeTurn[1] == "green") {
        if (parseInt(cubeTurn[0]) > greenMax) greenMax = parseInt(cubeTurn[0]);
      } else if (cubeTurn[1] == "blue") {
        if (parseInt(cubeTurn[0]) > blueMax) blueMax = parseInt(cubeTurn[0]);
      } else { 
        if (parseInt(cubeTurn[0]) > redMax) redMax = parseInt(cubeTurn[0]);
      }
    }
  }
  console.log(redMax * greenMax * blueMax);
  return redMax * greenMax * blueMax;
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
      resultValues.push("" + getPowerSetCubes(cubes));
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
