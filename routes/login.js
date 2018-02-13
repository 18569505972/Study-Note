var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var todo = require('../model/todo');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/loginCheck', urlencodedParser, function(req, res, next) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.loginCheck(req,res);
});
router.get('/login', urlencodedParser, function(req, res, next) {
    res.render('login.ejs', {});
});
module.exports = router;