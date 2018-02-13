var pkg = require("./package");
var express = require('express');
var path = require('path');
var app = express();
var routes = require("./routes/index");
//指定模板引擎
app.set("view engine", 'ejs');
//指定模板位置
;
app.set('views', __dirname + '/views');
//设置静态文件目录
app.use(express.static(path.join(__dirname, "public")));
//定义全局变量
app.locals.blog = {
    title: pkg.name,
    time: pkg.time,
    description: pkg.description
};
routes(app);
var server = app.listen(3000, function() {
    var address = server.address().address;
    var port = server.address().port;
    console.log("服务地址为：", address, port)
})