var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser');
var session = require('express-session')
var FileStore = require('session-file-store')(session);

app.set('port',  process.env.PORT || 8079);
app.set('host',  process.env.APP_HOST || 'localhost');

app.use(cors());

app.use(bodyParser.json());

//session
app.use(session({
    store: new FileStore,
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//public files
app.use("/api/uploads", express.static('uploads'));

module.exports = app;