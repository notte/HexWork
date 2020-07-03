module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ?
		'/HexWork' : '/',
	devServer: {
		open: true,
		host: 'localhost',
		port: 8081,
		https: false,
		hotOnly: false,
		proxy: {
			'/token': {
				target: 'https://course-ec-api.hexschool.io/api/auth/login',
				changeOrigin: true,
				ws: true,
			},
			'/api': {
				target: 'https://course-ec-api.hexschool.io/api/',
				ws: true,
				host: 'api.kkbox.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
	// configureWebpack: {
	// 	output: {
	// 		publicPath: '/'
	// 	},
	// }
};