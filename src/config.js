module.exports = {
  development: {
    isProduction: false,
    port: 3030,
    apiPort: 3031,
    app: {
      name: 'Jam',
    },
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: 3030,
    app: {
      name: 'Jam',
    },
  },
}[process.env.NODE_ENV || 'development'];
