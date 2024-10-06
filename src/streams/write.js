import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const writeStream = createWriteStream(
        path.join(__dirname, 'files/fileToWrite.txt'),
        'utf-8'
      );

    process.stdin.pipe(writeStream);
    writeStream.on('error', (error) => console.log(error.message));

};

await write();