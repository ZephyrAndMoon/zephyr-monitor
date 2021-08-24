const fs = require('fs')
const sourceMapTool = require('source-map')
const StreamZip = require('node-stream-zip')

const removeFile = url => {
	if (!fs.existsSync(url)) return
	const STATUS = fs.statSync(url)
	if (STATUS.isFile()) {
		fs.unlinkSync(url)
	} else if (STATUS.isDirectory()) {
		fs.readdirSync(url).forEach(item => removeFile(`${url}/${item}`))
		fs.rmdirSync(url)
	}
}

const analysisErrorPosition = (sourcemapFile, line, col) => {
	return new Promise(resolve => {
		fs.readFile(sourcemapFile, 'utf8', function readContent(
			err,
			sourcemapContent
		) {
			// sourcemapContent 文件内容
			if (err) {
				throw err
			}
			// SourceMapConsumer.with 是该模块提供的消费 source-map 的一种方式
			sourceMapTool.SourceMapConsumer.with(
				sourcemapContent,
				null,
				consumer =>
					resolve(
						consumer.originalPositionFor({
							line: parseInt(line),
							column: parseInt(col),
						})
					)
			)
		})
	})
}

const parseErrorInfo = async (info, sourceUrl) => {
	const { col, line } = info.logInfo // 取行和列
	// col , line, sourceUrl 文件路径
	let errorPosition = ''
	if (col && line) {
		const a = await analysisErrorPosition(
			sourceUrl,
			line,
			col
		)
		console.log(a)
		// errorPosition = _source + ':' + _line
	}
	return {
		...info,
		errorPosition,
	}
}

const processSourceFile = (file, extractPath, preFunc) => {
	return new Promise(resolve => {
		preFunc ? preFunc() : void 0
		const fileName = `${extractPath}/${file.name}`
		const path = file.path
		const fileWrite = fs.createWriteStream(fileName)
		fs.createReadStream(path).pipe(fileWrite)

		fileWrite.on('finish', () => {
			// 写入文件数据
			const zip = new StreamZip({
				file: fileName,
				storeEntries: true,
			})
			zip.on('ready', () => {
				zip.extract(null, './', (err, count) => {
					resolve({
						isSuccess: !Boolean(err),
						msg: err ? '文件处理失败' : `文件上传并解压成功`,
					})
					zip.close()
				})
			})
		})
	})
}

module.exports = {
	removeFile,
	parseErrorInfo,
	processSourceFile,
	analysisErrorPosition,
}
