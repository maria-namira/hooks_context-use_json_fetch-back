const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const Router = require('koa-router');

const app = new Koa();

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(cors());

const router = new Router();

router.get('/data', async (ctx, next) => {
  ctx.response.body = {status: "ok"};
});

router.get('/error', async (ctx, next) => {
  ctx.response.status = 500;
  ctx.response.body = {status: "Internal Error"};
});

router.get('/loading', async (ctx, next) => {
  await new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, 5000);
  });
  ctx.response.body = {status: "ok"};
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port, () => console.log(`The server started on port ${port}`));
console.log(`http://localhost:${port}`)