const parseArgs = () => {
    const allArgs = process.argv.slice(2);

    const args = allArgs.reduce((acc, cur, i) => {
        if (i % 2 === 0 && cur.startsWith('--')) {
            acc.push(cur.slice(2) + ' is ' + allArgs[i + 1]);
        }
        return acc;
    }, [])

    console.log(args.join(', '))
};

parseArgs();