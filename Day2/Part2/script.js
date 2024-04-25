"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
function getPowerSetCubes(cubesGrabs) {
    var redMax = 0;
    var greenMax = 0;
    var blueMax = 0;
    for (var _a = 0, cubesGrabs_1 = cubesGrabs; _a < cubesGrabs_1.length; _a++) {
        var cubeGrab = cubesGrabs_1[_a];
        var cubes = cubeGrab.split(", ");
        for (var _b = 0, cubes_1 = cubes; _b < cubes_1.length; _b++) {
            var cube = cubes_1[_b];
            var cubeTurn = cube.trim().split(" ");
            if (cubeTurn[1] == "green") {
                if (parseInt(cubeTurn[0]) > greenMax)
                    greenMax = parseInt(cubeTurn[0]);
            }
            else if (cubeTurn[1] == "blue") {
                if (parseInt(cubeTurn[0]) > blueMax)
                    blueMax = parseInt(cubeTurn[0]);
            }
            else { // This will handle the case for red cubes
                if (parseInt(cubeTurn[0]) > redMax)
                    redMax = parseInt(cubeTurn[0]);
            }
        }
    }
    console.log(redMax * greenMax * blueMax);
    return redMax * greenMax * blueMax;
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
            resultValues.push("" + getPowerSetCubes(cubes));
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
