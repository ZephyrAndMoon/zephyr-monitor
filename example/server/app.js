const Koa = require('koa2');
const fs = require('fs');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    );
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') ctx.body = 200;
    else await next();
});

app.use(bodyParser());

const Router = require('koa-router');

let home = new Router();

// 子路由1
home.post('/', async ctx => {
    console.log(ctx.request.body);
    ctx.body = 'ok';
});

// 装载所有子路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});
