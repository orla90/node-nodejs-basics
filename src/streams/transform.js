import { Transform } from 'stream';

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, String(chunk).split('').reverse().join(''));
        }
    });

    process.stdin.pipe(reverseStream).pipe(process.stdout);
    reverseStream.on('error', (error) => console.log(error.message));
};

await transform();