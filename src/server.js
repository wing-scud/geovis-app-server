
var express = require('express');
var fs = require('fs-extra')
var http = require('http');
var cors = require('cors')
var path = require('path');
const resolve = path.resolve;
var bodyParser = require('body-parser');
var useRoutes = require("./controllers/index.js");

const mongoose = require('mongoose');
var { Server } = require('socket.io');
try {
  const data = fs.readFileSync("public/config.json");
  global.CONFIG = JSON.parse(data);
  global.CONFIG.root = resolve('./');
  mongoose.set('useCreateIndex', true) //加上这个
  mongoose.connect(global.CONFIG.database, {
    useNewUrlParser: true
  })
  //监听数据库连接状态
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功……')
  })
  mongoose.connection.once('close', () => {
    console.log('数据库断开……')
  })
} catch (e) {
  console.log(e)
}
const PORT = CONFIG.port

function createApp() {
  var app = express();
  app.use(cors())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(function (req, res, next) {
    // get 转post请求
    req.method === "GET" && (req.body = req.query)
    next()
  });
  app.use("/static", express.static(path.resolve(global.CONFIG.staticPath || "./public/static")))
  return app;
}

var app = createApp();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
})
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
useRoutes(app, io)

server.listen(PORT, function () {
  console.log(`服务已启动, 监听端口 ${PORT}`)
})