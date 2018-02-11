const express = require("express");
const router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/deleteContent', urlencodedParser, function(req, res) {
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
module.exports = router;