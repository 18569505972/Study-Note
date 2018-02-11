const express = require("express");
const router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/saveContent', urlencodedParser, function(req, res) {
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
module.exports = router;