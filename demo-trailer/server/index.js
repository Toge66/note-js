const Koa = require("koa");
const logger = require("koa-logger");
const app = new Koa();
const views = require("koa-views");
const { resolve } = require("path");
const { connect, initSchema } = require("./database/init");
const mongoose = require("mongoose");

(async () => {
  await connect();
  initSchema();
  // require('./tasks/movie-list')
  // require('./tasks/trailer')
  // require('./tasks/api')
  require("./tasks/qiniu");
})();
app.use(logger());
app.use(
  views(resolve(__dirname, "./views"), {
    extension: "pug"
  })
);
app.use(async (ctx, next) => {
  await ctx.render("index", {
    data: {
      first: "Hello this is Koa-views render PUG template",
      second: "koa-view test"
    }
  });
  next();
});

app.listen(4455);
