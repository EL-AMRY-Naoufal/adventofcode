"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
function isGamePossible(cubesGrabs, possibleRed, possibleGreen, possibleblue) {
    for (var _a = 0, cubesGrabs_1 = cubesGrabs; _a < cubesGrabs_1.length; _a++) {
        var cubeGrab = cubesGrabs_1[_a];
        var cubes = cubeGrab.split(", ");
        for (var _b = 0, cubes_1 = cubes; _b < cubes_1.length; _b++) {
            var cube = cubes_1[_b];
            var cubeTurn = cube.trim().split(' ');
            if (cubeTurn[1] == 'red') {
                if (parseInt(cubeTurn[0]) > possibleRed)
                    return false;
            }
            if (cubeTurn[1] == 'green') {
                if (parseInt(cubeTurn[0]) > possibleGreen)
                    return false;
            }
            else {
                if (parseInt(cubeTurn[0]) > possibleblue)
                    return false;
            }
        }
    }
    return true;
}
function getPossibleGames(filePath) {
    return new Promise(function (resolve, reject) {
        var resultValues = [];
        var readStream = fs.createReadStream(filePath, { encoding: "utf8" });
        var rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity,
        });
        rl.on("line", function (line) {
            var games = line.split(":");
            var cubes = games[1].split(";");
            if (isGamePossible(cubes, 12, 13, 14)) {
                resultValues.push(games[0].split(" ")[1]);
            }
        });
        rl.on("close", function () {
            resolve(resultValues);
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
getPossibleGames("D:\\ESISA\\Adventure of code\\Day2\\input.txt");
