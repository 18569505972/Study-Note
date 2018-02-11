const express = require("express");
const router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/addMenus', urlencodedParser, function(req, res) {
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
module.exports = router;