module.exports = {
  apps: [
    {
      name: 'shionlib-frontend',
      script: 'npm',
      args: 'run start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_file: '.env',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
