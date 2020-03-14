const routes = require('./routes/index.route');

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.use(cors());

// Router
app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;