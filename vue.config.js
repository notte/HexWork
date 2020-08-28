module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ?
		'/HexWork' : '/',
	devServer: {
		open: true,
		host: 'localhost',
		port: 8081,
		https: false,
		hotOnly: false,
	},
};