const log4js = require('log4js');
const LOGGER_CONFIG = require('./../configs/logger.config');

log4js.configure(LOGGER_CONFIG);

const Logger = log4js.getLogger('default');
const ProductLogger = log4js.getLogger('productInfo');

module.exports = {
	Logger,
	ProductLogger,
};
