import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const file = path.join(__dirname, 'files/fileToCalculateHashFor.txt');
    const stream = createReadStream(file);
    const hash = createHash('sha256');

    stream.on('readable', () => {
        const data = stream.read();
        if (data) {
            hash.update(data);
        } else {
            console.log(hash.digest('hex'));
        }
    });
};

await calculateHash();