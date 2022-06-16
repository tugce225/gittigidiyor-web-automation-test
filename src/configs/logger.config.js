const LOGGER_CONFIG = {
	appenders: {
		console: {
			type: 'console',
			layout: { type: 'basic' },
			replaceConsole: true,
		},
		product: {
			type: 'file',
			filename: 'logs/product-info.txt',
		},
		log: {
			type: 'file',
			filename: 'logs/test.log',
		},
	},
	categories: {
		default: {
			appenders: ['log', 'console'],
			level: 'debug',
		},
		productInfo: {
			appenders: ['product', 'console'],
			level: 'debug',
		},
	},
};

module.exports = LOGGER_CONFIG;
