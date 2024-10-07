import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const writeStream = createWriteStream(
    path.join(__dirname, 'files/fileToWrite.txt'),
    'utf-8'
  );

const write = async () => {
    process.stdin.pipe(writeStream);
    writeStream.on('error', (error) => console.log(error.message));
};

await write();