const Koa = require('koa2');
const app = new Koa();
const cor = require('./utils/cor');
const { logger, accessLogger } = require('./utils/log');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const post = 3000;

// 配置跨域
app.use(cor);
// 配置参数接收
app.use(bodyParser());
// 配置日志
app.use(accessLogger());

let index = new Router();

// 子路由1
index.post('/', async ctx => {
    ctx.body = 'Server Status Ready';
});

// 子路由1
index.post('/mointor', async ctx => {
    logger.info(ctx.request.body);
    ctx.body = 'Already recorded parameters';
});

// 装载所有子路由
let router = new Router();
router.use('/', index.routes(), index.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(post, () => {
    console.log(`server is starting at port ${post}`);
});
