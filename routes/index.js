module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index.ejs', {
            "name": "赵永宁",
        });
    });
    app.get('/ui', function(req, res) {
        res.render('ui.ejs', {});
    });
    app.use("/uiInit", require("./uiInit"));
    app.use("/getContent", require("./getContent"));
    app.use("/addMenus", require("./addMenus"));
    app.use("/deleteContent", require("./deleteContent"));
    app.use("/saveContent", require("./saveContent"));
}