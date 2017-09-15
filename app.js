const express = require('express');
const app = express();
var cors = require('cors')
//var path = require('path');

/**
 * To render template files
 */
// set views to the folder containing the views
app.set('views', './views');
// set the template engine to use
app.set('view engine', 'pug');

/**
 * Base router in seperate file
 */
var router = require('./routes/router');
app.use('/',router);

//app.use(cors());
//app.use('Access-Control-Allow-Origin','*');

/**
 * port config
 */
const port = 8081;
app.listen(port, function () {
    console.log('App listening on port:' + port);
})