import { promises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const copyFolderPath = path.join(__dirname, 'files_copy');
    const curFolderPath = path.join(__dirname, 'files');
    const errorText = 'FS operation failed';

    try {
        await promises.access(copyFolderPath);
        throw new Error(errorText);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }

    try {
        await promises.access(curFolderPath);
    } catch (error) {
        if (error.code === 'ENOENT') throw new Error(errorText);
        throw error;
    }

    try {
        await promises.mkdir(copyFolderPath);
        const files = await promises.readdir(curFolderPath, { withFileTypes: true });
        
        for (const file of files) {
            const srcFile = path.join(curFolderPath, file.name);
            const destFile = path.join(copyFolderPath, file.name);
            
            if (file.isDirectory()) {
                await copyFolder(srcFile, destFile);
            } else {
                await promises.copyFile(srcFile, destFile);
            }
        }
    } catch(error) {
        throw error;
    }
};

await copy();
