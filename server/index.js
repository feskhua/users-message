const logger = require('./src/base/logger');
const server = require('./src/server');

const { PORT = 3000 } = process.env;
server.listen(PORT, (err) => {
  if (err) {
    return logger.error('Server failed to start', err);
  }

  return logger.info(`Server listening ${PORT}`);
});
