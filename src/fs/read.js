import { promises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'files/fileToRead.txt');
const errorText = 'FS operation failed';

const read = async () => {
    try {
        await promises.access(file);
    } catch (error) {
        if (error.code === 'ENOENT') throw new Error(errorText);
        throw error;
    }

    try {
        const fileContent = await promises.readFile(file, 'utf8');
        console.log(fileContent);
    } catch (error) {
        throw new Error(errorText);
    }
};

await read();