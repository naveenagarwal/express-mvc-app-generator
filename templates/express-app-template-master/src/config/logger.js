const winston = require('winston');

const { createLogger, format, transports } = winston;
const logger = {
  init() {
    global.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      )
    });

    global.logger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }));
  },
};

module.exports = logger;