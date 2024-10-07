import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readableStream = createReadStream(
    path.join(__dirname, 'files/fileToRead.txt'),
    'utf-8'
  );

const read = async () => {
    readableStream.on('data', (chunk) => process.stdout.write(chunk));
    readableStream.on('error', (error) => console.log(error.message));
};

await read();
