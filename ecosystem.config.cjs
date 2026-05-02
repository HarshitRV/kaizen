module.exports = {
  apps: [
    {
      name: 'kaizen',
      script: 'node_modules/.bin/vite',
      args: 'preview --port 3274 --host 0.0.0.0 --strictPort',
      cwd: '/home/harshitrvpi/code/pro/kaizen',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
