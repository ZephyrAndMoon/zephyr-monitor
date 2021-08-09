const fs = require('fs')
const p = require('path')
const axios = require('axios')
const FormData = require('form-data')
const sourceMapFileIncludes = [/\.map$/, /asset-manifest\.json/]

module.exports = {
	uploadFile: async options => {
		const { url, path } = options
		if (!url || !path)
			throw new Error("params 'url' and 'path' is required")
		var data = new FormData()
		data.append('file', fs.createReadStream(path))

		var config = {
			method: 'post',
			url: 'http://localhost:3000/sourcemapUpload',
			headers: {
				...data.getHeaders(),
			},
			data: data,
		}

		axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data))
			})
			.catch(function(error) {
				console.log('error')
			})
	},
	/**
	 * 递归读取文件夹
	 * 输出source-map文件目录
	 */
	readDir: path => {
		const filesContent = []

		function readSingleFile(path) {
			const files = fs.readdirSync(path)
			files.forEach(filePath => {
				const wholeFilePath = p.resolve(path, filePath)
				const fileStat = fs.statSync(wholeFilePath)
				// 查看文件是目录还是单文件
				if (fileStat.isDirectory()) {
					readSingleFile(wholeFilePath)
				}

				// 只筛选出manifest和map文件
				if (
					fileStat.isFile() &&
					sourceMapFileIncludes.some(r => r.test(filePath))
				) {
					filesContent.push(wholeFilePath)
				}
			})
		}

		readSingleFile(path)
		return filesContent
	},

	deleteFile: path => fs.unlinkSync(path),
}
