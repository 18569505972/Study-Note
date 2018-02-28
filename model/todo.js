var mongoose = require('mongoose');
var noteData = require('../configs/config').noteData;
var userData = require('../configs/config').userData;
var todo = mongoose.model('todo', noteData);
var user = mongoose.model('user', userData);
module.exports = {
    //校验登录
    loginCheck: function(req, res) {
        user.find(null, { username: 1, password: 1 }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                return;
            };
            var password = '';
            for (var obj of data) {
                if (obj.username == req.body.username) {
                    password = obj.password;
                    break;
                }
            };
            if (!password) {
                res.end(JSON.stringify({ 'message': '用户不存在', 'err': null, status: 4 }));
                return;
            }
            if (password == req.body.password) {
                req.session.username = req.body.username;
                res.end(JSON.stringify({ 'message': '登录成功', 'err': null, status: 1 }));
            } else {
                res.end(JSON.stringify({ 'message': '密码输入错误', 'err': null, status: 3 }));
            }

        });
    },
    //注册用户
    registerUser: function(req, res) {
        user.find(null, { _id: 0, updated_at: 0 }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                return;
            };
            for (var obj of data) {
                if (obj.username == req.body.username) {
                    res.end(JSON.stringify({ 'message': '用户已被创建', 'err': null, status: 0 }));
                    return;
                } else if (obj.telephone == req.body.telephone) {
                    res.end(JSON.stringify({ 'message': '手机号已注册', 'err': null, status: 0 }));
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
                res.end(JSON.stringify({ 'message': '注册成功', 'err': null, status: 1 }));
            });
        });
    },
    //页面初始化
    uiInit: function(req, res) {
        todo.find({ $and: [{ title: { $ne: null } }, { title: { $ne: '' } }] }, { title: 1 }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                return;
            };
            var arrInit = data;
            todo.findOne({}, { content: 1 }, function(err, data) {
                if (err) {
                    res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                    return;
                };
                arrInit[0].content = data.content;
                res.end(JSON.stringify(arrInit));
            });
        });
    },
    //添加菜单
    addMenus: function(req, res) {
        todo.find(null, { title: 1 }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                return;
            };
            for (var obj of data) {
                if (obj.title == req.query.title) {
                    res.end(JSON.stringify({ 'message': '目录已被创建', 'err': null, status: 0 }));
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
    },
    //删除菜单和内容
    deleteContent: function(req, res) {
        todo.findByIdAndRemove(req.query.id, {}, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                return;
            };
            todo.find({ $and: [{ title: { $ne: null } }, { title: { $ne: '' } }] }, { title: 1 }, function(err, data) {
                if (err) {
                    res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                    return;
                };
                var arrInit = data;
                todo.findOne({}, { content: 1 }, function(err, data) {
                    if (err) {
                        res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                        return;
                    };
                    arrInit[0].content = data.content;
                    res.end(JSON.stringify(arrInit));
                });
            });
        })
    },
    //保存内容
    saveContent: function(req, res) {
        todo.findByIdAndUpdate(req.query.id, { content: req.query.content }, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                return;
            };
            res.end(JSON.stringify(data));
        });
    },
    //获取内容
    getContent: function(req, res) {
        todo.findById(req.query.id, function(err, data) {
            if (err) {
                res.end(JSON.stringify({ message: '服务器异常', err: err, status: 0 }));
                return;
            };
            res.end(JSON.stringify(data));
        });
    }
};