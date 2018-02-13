var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var todo = require('../model/todo');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/ui', function(req, res) {
    res.render('ui.ejs', {});
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
router.get('/addMenus', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.addMenus(req, res);
});
router.get('/deleteContent', urlencodedParser, function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.deleteContent(req, res);
})
router.get('/saveContent', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); //设置response编码为utf-8
    todo.saveContent(req, res);
});
module.exports = router;