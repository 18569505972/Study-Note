var config = require('../configs/config');
var session = require('express-session'),
    connect = require('connect'),
    MongoStore = require('connect-mongo')(session),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');
module.exports = function(app) {
    app.use(session({
        secret: 'cookie-secret',
        resave: 'false',
        saveUninitialized: 'true',
        cookie:{maxAge:1000*60},
        store: new MongoStore({
            url: config.dbUrl,
            ttl: config.outTime,

        })
    }));
    app.use("/", require("./login"));
    app.use("/", require("./register"));
    app.use("/", require("./ui"));
    app.use("/", require("./page"));
}