const parseEnv = () => {
    const environmentVariables = Object.entries(process.env)
        .filter(([key, value]) => key.startsWith('RSS_'))
        .map(([key, value]) => {
            return key + '=' + value
        });

    if (environmentVariables) console.log(environmentVariables.join('; '));
};

parseEnv();