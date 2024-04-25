import * as fs from "fs";
import * as readline from "readline";

function isASCIIInRange(char: string): boolean {
  const asciiCode = char.charCodeAt(0);
  return asciiCode >= 48 && asciiCode <= 60;
}

function calibrationValues(filePath: string) {
  return new Promise<string[]>((resolve, reject) => {
    const resultValues: string[] = [];
    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line: string) => {
      const values: string[] = [];
      for(const char of line){
        if (isASCIIInRange(char)) values.push(char);
      }
      resultValues.push(values[0] + values[values.length - 1]);
    });

    rl.on("close", () => {
      resolve(resultValues);
      console.log(resultValues);
      getSomme(resultValues);
    });

    readStream.on("error", (error: Error) => {
      reject(error);
    });
  });
}

function getSomme(resultValues:string[]){
  let result = 0;
  for(const value of resultValues){
    result += parseInt(value);
  }

  console.log(result);
}

calibrationValues("D:\\ESISA\\Adventure of code\\Day1\\Trebuchet\\input.txt");
