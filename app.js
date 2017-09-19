const express = require('express');
const app = express();
//var cors = require('cors')
//var path = require('path');

/**
 * To get data from the req body in case of post methods.
 * can be moved to config file.
 */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


/**
 * To render template files
 * can be moved to config file.
 */
// set views to the folder containing the views
app.set('views', './views');
// set the template engine to use
app.set('view engine', 'pug');

/**
 * Base router in seperate file
 * can be moved to donfig file.
 */
var router = require('./routes/router');
app.use('/',router);

//app.use(cors());
//app.use('Access-Control-Allow-Origin','*');

/**
 * port config
 * can be moved to config file.
 */
const port = 8081;


app.listen(port, function () {
    console.log('App listening on port:' + port);
})