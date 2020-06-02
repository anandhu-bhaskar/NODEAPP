// main server file

const express = require('express');
const bodyParser = require('body-parser'); // used to parsebody of the file

var cors = require('cors')

// create express app
const app = express();

app.use(cors()) // Use this after the variable declaration

// to serve html pages
// app.use(express.static('./public'));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/json
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route for home page
app.get('/', function(req, res){
    res.sendfile( __dirname + "/index.html ");
});


// Require all routes from routes.js file
require('./app/routes/comment.routes.js')(app);


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});