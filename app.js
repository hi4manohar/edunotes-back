var routes = require('./routes/index.route');
var session = require('express-session')
var FileStore = require('session-file-store')(session);

var express = require('express')
var cors = require('cors')
var app = express()
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');


app.use(cors());

// Router

//session
app.use(session({
    store: new FileStore,
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;