import { promises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const folder = path.join(__dirname, 'files');
    const file = path.join(folder, 'fresh.txt');

    try {
        await promises.access(file);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;

        try {
            await promises.mkdir(folder);
        } catch (error) {
            if (error.code !== 'EEXIST') throw error;
        }

        await promises.writeFile(file, 'I am fresh and young');
    }
};

await create();
