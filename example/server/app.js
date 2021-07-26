const Koa = require('koa2')
const app = new Koa()
const cor = require('./utils/cor')
const { logger, accessLogger } = require('./utils/log')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const post = 3000

// 配置跨域
app.use(cor)
// 配置参数接收
app.use(bodyParser())
// 配置日志
app.use(accessLogger())

// 子路由1
router.get('/', async ctx => {
  ctx.body = 'Server Status Ready'
})

// 子路由1
router.post('/monitor', async ctx => {
  logger.info(ctx.request.body)
  ctx.body = 'Already recorded parameters'
})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())

app.listen(post, () => {
  console.log(`server is starting at port ${post}`)
})
