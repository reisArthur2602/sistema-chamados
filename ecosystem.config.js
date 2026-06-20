module.exports = {
    apps: [
        {
            name: 'nexus',
            script: 'node_modules/.bin/next',
            args: 'start',
            cwd: './',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 5050,
            },
        },
    ],
};
