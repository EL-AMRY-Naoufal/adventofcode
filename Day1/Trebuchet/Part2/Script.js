"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var numberStrings = [
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
var numberDictionary = {
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
function isASCIIInRange(char) {
    var asciiCode = char.charCodeAt(0);
    return asciiCode >= 48 && asciiCode <= 60;
}
function calibrationValues(filePath) {
    return new Promise(function (resolve, reject) {
        var resultValues = [];
        var readStream = fs.createReadStream(filePath, { encoding: "utf8" });
        var rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity,
        });
        rl.on("line", function (line) {
            var mergedArray = [];
            var numberLitters = [];
            var numbers = [];
            for (var _i = 0, numberStrings_1 = numberStrings; _i < numberStrings_1.length; _i++) {
                var number = numberStrings_1[_i];
                if (line.includes(number)) {
                    var regex = new RegExp(number, 'g');
                    var match = void 0;
                    while ((match = regex.exec(line)) !== null) {
                        numberLitters.push({ key: numberDictionary[number], value: match.index });
                    }
                }
            }
            for (var _a = 0, line_1 = line; _a < line_1.length; _a++) {
                var char = line_1[_a];
                if (isASCIIInRange(char)) {
                    var regex = new RegExp(char, 'g');
                    var match = void 0;
                    while ((match = regex.exec(line)) !== null) {
                        numbers.push({ key: char, value: match.index });
                    }
                }
            }
            for (var _b = 0, numberLitters_1 = numberLitters; _b < numberLitters_1.length; _b++) {
                var _c = numberLitters_1[_b], key = _c.key, value = _c.value;
                mergedArray.push({ key: key, value: value });
            }
            for (var _d = 0, numbers_1 = numbers; _d < numbers_1.length; _d++) {
                var _e = numbers_1[_d], key = _e.key, value = _e.value;
                mergedArray.push({ key: key, value: value });
            }
            mergedArray.sort(function (a, b) { return a.value - b.value; });
            resultValues.push("" + mergedArray[0].key + mergedArray[mergedArray.length - 1].key);
        });
        rl.on("close", function () {
            resolve(resultValues);
            console.log(resultValues);
            console.log(getSomme(resultValues));
        });
        readStream.on("error", function (error) {
            reject(error);
        });
    });
}
function getSomme(resultValues) {
    var result = 0;
    for (var _i = 0, resultValues_1 = resultValues; _i < resultValues_1.length; _i++) {
        var value = resultValues_1[_i];
        result += parseInt(value);
    }
    return result;
}
calibrationValues("D:\\ESISA\\Adventure of code\\Day1\\Trebuchet\\input.txt");
