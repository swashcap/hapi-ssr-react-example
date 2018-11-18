const hapi = require('hapi');

const port = process.env.PORT || 3000;

const server = new hapi.Server({
  host: 'localhost',
  port: port
});

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

if (require.main === module) {
  server.start().then(() => {
    console.log(`Server running at ${server.info.uri}`);
  })
}

module.exports = server;
