import { promises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folder = path.join(__dirname, 'files');
const oldFile = path.join(folder, 'wrongFilename.txt');
const newFile = path.join(folder, 'properFilename.md');
const errorText = 'FS operation failed';

const rename = async () => {
    try {
        await promises.access(oldFile);
    } catch (error) {
        if (error.code === 'ENOENT') throw new Error(errorText);
        throw error;
    }

    try {
        await promises.access(newFile);
        throw new Error(errorText);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }

    try {
        await promises.rename(oldFile, newFile);
    } catch (error) {
        throw new Error(errorText);
    }
};

await rename();