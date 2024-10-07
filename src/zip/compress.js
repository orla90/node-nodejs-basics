import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'files/fileToCompress.txt');
const archive = path.join(__dirname, 'files/archive.gz');

const compress = async () => {
    const pipe = promisify(pipeline);
    
    try {
        await pipe(createReadStream(file), createGzip(), createWriteStream(archive));
    } catch (err) {
        console.log(err.message);
    }
};

await compress();