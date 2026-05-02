module.exports = {
  apps: [
    {
      name: 'kaizen-ui',
      cwd: '/home/harshitrvpi/code/pro/kaizen',
      script: '/home/harshitrvpi/.nvm/versions/node/v24.14.1/bin/pnpm',
      args: 'run preview',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
