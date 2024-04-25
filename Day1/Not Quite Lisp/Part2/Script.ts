import * as fs from 'fs' 

function getPositionToEnterTheBasement(filePath: string){
    return new Promise((resolve, reject) => {
        let floor = 0;

        let floorPosition = 1;

        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

        readStream.on('data', (chunk: string) => {
            for(const char of chunk){
                char == '(' ? floor +=1 : floor -= 1;

                floor == -1 ? console.log('floor position : ' + floorPosition) : floorPosition++;
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

getPositionToEnterTheBasement('D:\\ESISA\\Adventure of code\\Day1\\Not Quite Lisp\\input.txt');