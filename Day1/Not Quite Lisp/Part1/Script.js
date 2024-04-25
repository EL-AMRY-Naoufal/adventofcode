"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function getFloor(filePath) {
    return new Promise(function (resolve, reject) {
        var characters = '';
        var floor = 0;
        var readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        readStream.on('data', function (chunk) {
            for (var _i = 0, chunk_1 = chunk; _i < chunk_1.length; _i++) {
                var char = chunk_1[_i];
                char == '(' ? floor += 1 : floor -= 1;
            }
        });
        readStream.on('end', function () {
            console.log(floor);
            resolve(characters);
        });
        readStream.on('error', function (error) {
            reject(error);
        });
    });
}
getFloor('D:\\ESISA\\Adventure of code\\Day1\\Not Quite Lisp\\Part1\\input.txt');
