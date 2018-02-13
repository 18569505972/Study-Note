var pkg = require("./package");
var express = require('express');
var path = require('path');
var app = express();
const routes = require("./routes");
var mongoose = require('mongoose');
var noteData = require('./configs/config').noteData;
var userData = require('./configs/config').userData;
var todo=mongoose.model('todo',noteData);
var user=mongoose.model('user',userData);
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
app.get('/index', function(req, res) {
    res.render('index.ejs', {
        "name": "赵永宁",
    });
});
app.get('/login', function(req, res) {
    res.render('login.ejs', {});
});
app.get('/register', function(req, res) {
    res.render('register.ejs', {});
});
app.post('/registerUser', urlencodedParser,function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    user.find(null, {_id:0,updated_at:0}, function(err, data) {
        if (err) {
            res.end(JSON.stringify({ message: '服务器异常', err: err,status:0 }));
            return;
        };
        for(var obj of data){
            if(obj.username==req.body.username){
                res.end(JSON.stringify({ 'message':'用户已被创建', 'err': null,status:0 }));
                return;
            }else if(obj.telephone==req.body.telephone){
                res.end(JSON.stringify({ 'message':'手机号已注册', 'err': null, status:0 }));
                return;
            }
        };
        new user({ //实例化对象，新建数据
            username: req.body.username,
            telephone: req.body.telephone,
            email: req.body.email,
            password: req.body.password,
            updated_at: new Date().toLocaleString()
        }).save(function(err, user, count) { //保存数据
            res.end(JSON.stringify({ 'message':'注册成功', 'err': null, status:1 }));
        });
    });
});
app.post('/loginCheck', urlencodedParser,function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    user.find(null, {username:1,password:1}, function(err, data) {
        if (err) {
            res.end(JSON.stringify({ message: '服务器异常', err: err,status:0 }));
            return;
        };
        var password='';
        for(var obj of data){
            if(obj.username==req.body.username){
                password=obj.password;
                break;
            }
        };
        if(!password){
             res.end(JSON.stringify({ 'message':'用户不存在', 'err': null,status:4 }));
             return;
        }
        if(password==req.body.password){
            res.end(JSON.stringify({ 'message':'登录成功', 'err': null,status:1 }));
        }else{
            res.end(JSON.stringify({ 'message':'密码输入错误', 'err': null,status:3 }));
        }

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
            res.end(JSON.stringify({ message: '服务器异常', err: err,status:0 }));
            return;
        };
        var arrInit = data;
        todo.findOne({}, { content: 1 }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err,status:0 }));
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
            res.end(JSON.stringify({ message: '服务器异常', err: err,status:0 }));
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
            res.end(JSON.stringify({ message: '服务器异常', err: err,status:0 }));
            return;
        };
        for(var obj of data){
        	if(obj.title==req.query.title){
        		res.end(JSON.stringify({ 'message':'目录已被创建', 'err': null,status:0 }));
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
            res.end(JSON.stringify({ message: '服务器异常', err: err,status:0 }));
            return;
        };
        todo.find({ $and: [{ title: { $ne: null } }, { title: { $ne: '' } }] }, { title: 1 }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err,status:0 }));
                return;
            };
            var arrInit = data;
            todo.findOne({}, { content: 1 }, function(err, data) {
                if (err) {
                    res.end(JSON.stringify({ message: '服务器异常', err: err ,status:0}));
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
            res.end(JSON.stringify({ message: '服务器异常', err: err ,status:0}));
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