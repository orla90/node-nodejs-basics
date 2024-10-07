import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, './worker.js');

let results = new Array(os.cpus().length).fill(null);

const calcWorkerFunc = (workerData) => new Promise((resolve) => {
    const worker = new Worker(file, { workerData });

    worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
    });

    worker.on('error', () => {
        resolve({ status: 'error', data: null });
    });
})

const performCalculations = async () => {
    results = results.map((_, i) => calcWorkerFunc(10 + i));
    const finalResults = await Promise.all(results);
    console.log(finalResults);
};

await performCalculations();