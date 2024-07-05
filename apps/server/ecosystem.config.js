module.exports = {
  apps: [
    {
      name: 'poster-craft-server',
      script: 'pnpm',
      args: 'start:prod',
      cwd: '.',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
