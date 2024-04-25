"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
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
            var values = [];
            for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
                var char = line_1[_i];
                if (isASCIIInRange(char))
                    values.push(char);
            }
            resultValues.push(values[0] + values[values.length - 1]);
        });
        rl.on("close", function () {
            resolve(resultValues);
            console.log(resultValues);
            getSomme(resultValues);
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
    console.log(result);
}
calibrationValues("D:\\ESISA\\Adventure of code\\Day1\\Trebuchet\\input.txt");
