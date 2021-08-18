const fs = require('fs')
const sourceMapTool = require('source-map')

const removeFile = url => {
	// 读取原路径
	const STATUS = fs.statSync(url)
	// 如果原路径是文件
	if (STATUS.isFile()) {
		//删除原文件
		fs.unlinkSync(url)

		//如果原路径是目录
	} else if (STATUS.isDirectory()) {
		//如果原路径是非空目录,遍历原路径
		//空目录时无法使用forEach
		fs.readdirSync(url).forEach(item => {
			//递归调用函数，以子文件路径为新参数
			removeFile(`${url}/${item}`)
		})
		//删除空文件夹
		fs.rmdirSync(url)
	}
}

// 根据行数获取源文件行数
const getPosition = async (map, rolno, colno) => {
	const consumer = await new sourceMap.SourceMapConsumer(map)

	const position = consumer.originalPositionFor({
		line: rolno,
		column: colno,
	})

	position.content = consumer.sourceContentFor(position.source)

	return position
}

const parseJSError = (sourcemapFile, line, col) => {
	console.log('col: ', col);
	console.log('line: ', line);
	console.log('sourcemapFile: ', sourcemapFile)
	// 选择抛出一个 promise 方便我们使用 async 语法
	return new Promise(resolve => {
		fs.readFile(sourcemapFile, 'utf8', function readContent(
			err,
			sourcemapcontent
		) {
			// SourceMapConsumer.with 是该模块提供的消费 source-map 的一种方式
			sourceMapTool.SourceMapConsumer.with(
				sourcemapcontent,
				null,
				consumer => {
					const parseData = consumer.originalPositionFor({
						line: parseInt(line),
						column: parseInt(col),
					})

					resolve(JSON.stringify(parseData))
				}
			)
		})
	})
}

module.exports = {
	removeFile,
	parseJSError,
}
