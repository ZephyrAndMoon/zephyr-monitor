const Koa = require('koa2')
const app = new Koa()
const fs = require('fs')
const cor = require('./utils/cor')
const path = require('path')
const router = require('koa-router')()

const koaBody = require('koa-body')
const { accessLogger } = require('./utils/log')
const {
	removeFile,
	parseErrorInfo,
	processSourceFile,
} = require('./utils/util')

const post = 3000

// 配置跨域
app.use(cor)
app.use(
	koaBody({
		multipart: true,
		formidable: {
			maxFileSize: 200 * 1024 * 1024,
		},
	})
)
// 配置日志
app.use(accessLogger())

// 测试路由
router.get('/', async ctx => {
	ctx.body = 'Server Status Ready'
})

// 监控信息上报
router.post('/monitor', async ctx => {
	const parseInfo = await parseErrorInfo(
		ctx.request.body,
		path.resolve(__dirname, 'source', fs.readdirSync('./source')[0])
	)
	console.log(parseInfo)
	ctx.body = {
		code: 1,
		data: parseInfo,
	}
})

// sourcemap资源上传并解压
router.post('/sourcemapUpload', async ctx => {
	const { isSuccess, msg } = await processSourceFile(
		ctx.request.files?.file,
		path.resolve(__dirname),
		removeFile('./source')
	)
	ctx.body = {
		code: isSuccess ? 1 : 0,
		msg,
	}
})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())

app.listen(post, () => {
	console.log(`server is starting at port ${post}`)
})
