module.exports = {
    apps: [
        {
            name: 'sistema-chamados',
            script: 'node_modules/.bin/next',
            args: 'start',
            cwd: './',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 5050,
            },
            watch: false,
            max_memory_restart: '512M',
        },
    ],
};
