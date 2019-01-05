import pino from 'pino';

const logger = pino({
    name: 'customapi',
    level: 'debug',
    prettyPrint: {
        levelFirst: true,
        forceColor: true,
    },
});

if (process.env.loglevel) {
  logger.level = process.env.loglevel;
  logger.info('Setting loglevel to', logger.level);
}

export function info(...args) {
    logger.info(...args);
}

export function error(...args) {
    logger.error(...args);
}

export function debug(...args) {
    logger.debug(...args);
}

export function warn(...args) {
    logger.warn(...args);
}

export default { info, error, debug, warn };
