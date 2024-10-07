import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { promisify } from 'util';
import { pipeline } from 'stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'files/fileToCompress.txt');
const archive = path.join(__dirname, 'files/archive.gz');

const decompress = async () => {
    const pipe = promisify(pipeline);

    try {
        await pipe(createReadStream(archive), createGunzip(), createWriteStream(file));
    } catch (err) {
        console.log(err.message);
    }
};

await decompress();