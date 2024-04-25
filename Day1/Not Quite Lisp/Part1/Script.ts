import * as fs from 'fs' 

function getFloor(filePath: string){
    return new Promise((resolve, reject) => {
        let floor = 0;
        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

        readStream.on('data', (chunk: string) => {
            for(const char of chunk){
                char == '(' ? floor +=1 : floor -= 1;
            }
        });

        readStream.on('end', () => {
            console.log(floor);
        });

        readStream.on('error', (error: Error) => {
            reject(error);
        });
    });
}   

getFloor('D:\\ESISA\\Adventure of code\\Day1\\Not Quite Lisp\\Part1\\input.txt');