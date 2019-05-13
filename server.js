const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const user = require('./app/controllers/user.controller.js');

const isOnHeroku = process.env.NODE && ~process.env.NODE.indexOf("heroku");

// create express app
const app = express();

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))


let allowedOrigin = 'http://localhost:5000';
if (isOnHeroku) {
    allowedOrigin = 'https://tensor-webdev19-tasks-client.herokuapp.com';
}

app.use(cors({ origin: allowedOrigin, credentials: true }))

// For cookies to work on heroku
app.enable('trust proxy');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

app.use(user.authMiddleware);

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/api/testroute', (req, res) => {
    res.cookie('test', 'testval');
    res.json({ "message": "Welcome to Tasks application." });
});

require('./app/routes/task.routes.js')(app);
require('./app/routes/user.routes.js')(app);

if (isOnHeroku) {
    // Anything that doesn't match the above, send back index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}

app.set('port', (process.env.PORT || 5000));

// listen for requests
app.listen(app.get('port'), () => {
    console.log(`App is running on port ${app.get('port')}`);
});