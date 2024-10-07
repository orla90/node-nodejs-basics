import { promises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folder = path.join(__dirname, 'files');
const errorText = 'FS operation failed';

const list = async () => {
    try {
        await promises.access(folder);
    } catch (error) {
        if (error.code === 'ENOENT') throw new Error(errorText);
        throw error;
    }

    try {
        const filenames = await promises.readdir(folder);
        console.log(filenames);
    } catch (error) {
        throw new Error(errorText);
    }

};

await list();