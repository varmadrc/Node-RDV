const express = require('express');
const app = express();
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

/**
 * port config
 */
const port = 8081;
app.listen(port, function () {
    console.log('Example app listening on port:' + port);
})