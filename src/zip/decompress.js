import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { promisify } from 'util';
import { pipeline } from 'stream';

const decompress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const file = path.join(__dirname, 'files/fileToCompress.txt');
    const archive = path.join(__dirname, 'files/archive.gz');
    const gunzip = createGunzip();

    const src = createReadStream(archive);
    const dest = createWriteStream(file);

    const pipe = promisify(pipeline);

    try {
        await pipe(src, gunzip, dest);
    } catch (err) {
        console.log(err.message);
    }
};

await decompress();