var express = require('express');
//var path = require('path');
var router = express.Router();
var process = require('../dbProcess/process');
var proc = require('../dbProcess/proc');
var bodyParser = require('body-parser');
var urlenbodyParser = bodyParser.urlencoded({extended:false});


router.get('/',function(req,res) {
    //console.log(path.dirname(__dirname),' , ', __dirname);
    //console.log(path.parse(__dirname).dir);
    //res.sendFile(path.join(path.dirname(__dirname),'index.html'));
    res.render('index', { title: 'Node', message: 'Login Form' });
});
router.get('/pug',function(req,res) {
    res.render('index', { title: 'Node', message: 'Dont submit the form' });
});
router.post('/user', urlenbodyParser, function(req,res) {
    var pro = new process();
    var user = req.body.user;
    var password = req.body.password;
    pro.checkUser(user,password,function (err, result) {
        if(err) {
            res.render('index', { title: 'Node', message: 'Login Form', error: 'Check credentials' });
        } else {
            res.send('Sucessesfully posted');
        }
    })
});
router.get('/getPassword', function(req,res) {
    proc.getPassword('upma',function (err, result) {
        if(err) {
            res.render('index', { title: 'Node', message: 'Login Form', error: 'No user Found' });
        } else {
            res.send('Password for upma is ' + result);
        }
    })
});


module.exports = router;