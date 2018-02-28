var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var todo = require('../model/todo');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var filter = require('../libs/filter');
router.get('/index', filter.authorize,function(req, res) {
    res.render('index.ejs', {
        "name": "赵永宁",
    });
});
router.get('/uiInit', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.uiInit(req, res);
});
router.get('/getContent', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.getContent(req, res);
});
module.exports = router;