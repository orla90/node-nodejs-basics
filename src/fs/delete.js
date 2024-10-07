import { promises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folder = path.join(__dirname, 'files');
const file = path.join(folder, 'fileToRemove.txt');
const errorText = 'FS operation failed';

const remove = async () => {
    try {
        await promises.access(file);
    } catch (error) {
        if (error.code === 'ENOENT') throw new Error(errorText);
        throw error;
    }

    try {
        await promises.unlink(file);
    } catch (error) {
        throw new Error(errorText);
    }
};

await remove();