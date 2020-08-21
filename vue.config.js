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
				pathRewrite: {
					'^/token': '',
				},
			},
			'/api': {
				target: 'https://course-ec-api.hexschool.io/api/59677b21-aeb1-45eb-8ac8-9fe077baa5a0/',
				ws: true,
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