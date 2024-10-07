const parseArgs = () => {
    const args = process.argv
        .slice(2)
        .reduce((acc, cur, i, arr) => {
            if (i % 2 === 0 && cur.startsWith('--')) {
                acc.push(cur.slice(2) + ' is ' + arr[i + 1]);
            }
            return acc;
        }, [])

    console.log(args.join(', '))
};

parseArgs();