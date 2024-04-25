import * as fs from "fs";
import * as readline from "readline";

const numberStrings: string[] = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const numberDictionary: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

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
      const mergedArray: { key: any; value: any }[] = [];
      const numberLitters: { [key: string]: any }[] = [];
      const numbers: { [key: string]: any }[] = [];

      for (const number of numberStrings) {
        if (line.includes(number)) {
          const regex = new RegExp(number, 'g');
          let match;
          while ((match = regex.exec(line)) !== null) {
            numberLitters.push({ key: numberDictionary[number], value: match.index });
          }
        }
      }

      for (const char of line) {
        if (isASCIIInRange(char)) {
          const regex = new RegExp(char, 'g');
          let match;
          while ((match = regex.exec(line)) !== null) {
            numbers.push({ key: char, value: match.index });
          }
        }
      }

      for (const { key, value } of numberLitters) {
        mergedArray.push({ key: key, value: value });
      }

      for (const { key, value } of numbers) {
        mergedArray.push({ key: key, value: value });
      }

      mergedArray.sort((a, b) => a.value - b.value);

      resultValues.push(
        "" + mergedArray[0].key + mergedArray[mergedArray.length - 1].key
      );
    });

    rl.on("close", () => {
      resolve(resultValues);
      console.log(resultValues);
      console.log(getSomme(resultValues));
    });

    readStream.on("error", (error: Error) => {
      reject(error);
    });
  });
}

function getSomme(resultValues: string[]) {
  let result = 0;
  for (const value of resultValues) {
    result += parseInt(value);
  }
  return result;
}

calibrationValues("D:\\ESISA\\Adventure of code\\Day1\\Trebuchet\\input.txt");
