/*
 * webpack配置打包
 */
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.config')

console.log(' Packing in progress，Please wait later...\n')

webpack(webpackConfig, function (err, stats) {
	if (err) throw err
	process.stdout.write(
		stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false,
		}) + '\n'
	)

	console.log(' \nPacking completed!\n')
})
