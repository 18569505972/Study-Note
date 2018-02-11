var pkg = require("./package");
var express = require('express');
var path = require('path');
var app = express();
const routes = require("./routes");
var todo = require('./configs/config');
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
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
app.get('/', function(req, res) {
    res.render('index.ejs', {
        "name": "赵永宁",
    });
});
app.get('/ui', function(req, res) {
    res.render('ui.ejs', {});
});
app.get('/uiInit', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.find({ $and: [{ title: { $ne: null } }, { title: { $ne: '' } }] }, { title: 1 }, function(err, data) {
        if (err) {
            res.end(JSON.stringify({ message: '服务器异常', err: err }));
            return;
        };
        var arrInit = data;
        todo.findOne({}, { content: 1 }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err }));
                return;
            };
            arrInit[0].content = data.content;
            res.end(JSON.stringify(arrInit));
        });
    });
});
app.get('/getContent', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.findById(req.query.id, function(err, data) {
        if (err) {
            res.end(JSON.stringify({ message: '服务器异常', err: err }));
            return;
        };
        res.end(JSON.stringify(data));
    });
});
app.get('/addMenus', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.find(null, { title: 1 }, function(err, data) {
        if (err) {
            res.end(JSON.stringify({ message: '服务器异常', err: err }));
            return;
        };
        for(var obj of data){
        	if(obj.title==req.query.title){
        		res.end(JSON.stringify({ 'message':'目录已被创建', 'err': null }));
        		return;
        	}
        };
        new todo({ //实例化对象，新建数据
            title: req.query.title,
            content: "",
            updated_at: new Date().toLocaleString()
        }).save(function(err, todo, count) { //保存数据
            res.end(JSON.stringify(todo));
        });
    });
});
app.get('/deleteContent', urlencodedParser, function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.findByIdAndRemove(req.query.id, {}, function(err, data) {
        if (err) {
            res.end(JSON.stringify({ message: '服务器异常', err: err }));
            return;
        };
        todo.find({ $and: [{ title: { $ne: null } }, { title: { $ne: '' } }] }, { title: 1 }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err }));
                return;
            };
            var arrInit = data;
            todo.findOne({}, { content: 1 }, function(err, data) {
                if (err) {
                    res.end(JSON.stringify({ message: '服务器异常', err: err }));
                    return;
                };
                arrInit[0].content = data.content;
                res.end(JSON.stringify(arrInit));
            });
        });
    })
})
app.get('/saveContent', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.findByIdAndUpdate(req.query.id, { content: req.query.content }, function(err, data) {
        if (err) {
            res.end(JSON.stringify({ message: '服务器异常', err: err }));
            return;
        };
        res.end(JSON.stringify(data));
    });
});
var server = app.listen(3000, function() {
    var address = server.address().address;
    var port = server.address().port;
    console.log("服务地址为：", address, port)
})