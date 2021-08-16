const Koa = require('koa2')
const app = new Koa()
const fs = require('fs')
const cor = require('./utils/cor')
const router = require('koa-router')()
const StreamZip = require('node-stream-zip')

const koaBody = require('koa-body')
const { logger, accessLogger } = require('./utils/log')
const { removeFile } = require('./utils/util')

const sourceMapTool = require('source-map')

const post = 3000

// 配置跨域
app.use(cor)
app.use(
	koaBody({
		multipart: true,
		formidable: {
			maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
		},
	})
)
// 配置日志
app.use(accessLogger())

// 子路由1
router.get('/', async ctx => {
	ctx.body = 'Server Status Ready'
})

// 子路由1
router.post('/monitor', async ctx => {
	console.log(ctx.request.body)
	logger.info(ctx.request.body)
	ctx.body = 'Already recorded parameters'
})

router.post('/sourcemapUpload', async ctx => {
	const { file } = ctx.request.files
	const name = file.name
	const _path = file.path
	const fileWrite = fs.createWriteStream(`./${name}`)
	fs.createReadStream(_path).pipe(fileWrite)
	removeFile('./sourcemap')
	fileWrite.on('finish', () => {
		// 写入文件数据
		const zip = new StreamZip({
			file: './sourcemap.zip',
			storeEntries: true,
		})
		zip.on('ready', () => {
			zip.extract(null, './', (err, count) => {
				console.log(
					err ? 'Extract error' : `Extracted ${count} entries`
				)
				zip.close()
			})
		})
	})
	ctx.body = {
		code: 200,
		msg: '文件上传成功',
	}
})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())

app.listen(post, () => {
	console.log(`server is starting at port ${post}`)
})
