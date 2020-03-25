var routes = require('./routes/index.route');
var app = require('./config/express.config');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', routes);

app.listen(app.get('port'), app.get('host'), () => {
	console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

module.exports = app;