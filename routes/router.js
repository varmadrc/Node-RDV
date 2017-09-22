var express = require('express');

//var path = require('path');
var router = express.Router();
//var process = require('../dbProcess/process');
var proc = require('../dbProcess/proc');
var sql = require('../dbProcess/sqlDbMethods');


router.get('/', function (req, res) {
    //console.log(path.dirname(__dirname),' , ', __dirname);
    //console.log(path.parse(__dirname).dir);
    //res.sendFile(path.join(path.dirname(__dirname),'index.html'));
    res.render('index', { title: 'Node', message: 'Login Form' });
});
router.get('/pug', function (req, res) {
    res.render('index', { title: 'Node', message: 'Dont submit the form' });
});
router.get('/twoTableTest', function (req, res) {
    let mobiles = new sql();
    mobiles.getTables(function (err, data) {
        if (err)
            return res.send(err);
        else
            result = [data.recordsets[0],data.recordsets[1]]
            console.log(data.recordsets[1]);
            res.send(result);
    });
});
router.get('/mobileData', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    let auth = req.headers['authentication'];
    let mobiles = new sql();
    mobiles.getdata(auth,function (err, data) {
        if (err)
            return res.send(err);
        else
            res.send(data);
    });
});
router.get('/getHeros', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send([
        {
            name: 'Superman',
            location: 'Metropolitan'
        },
        {
            name: 'Batman',
            location: 'Wayne Manor'
        },
        {
            name: 'Flash',
            location: ''
        },
        {
            name: 'AuqaMan',
            location: 'Ocean'
        },
        {
            name: 'WonderWoman',
            location: 'Atlantis'
        },
        {
            name: 'GreenLantern',
            location: 'GreenLantern Corp.'
        },
        {
            name: 'Cyborg',
            location: ''
        },
        {
            name: 'Martian ManHunter',
            location: 'Mars'
        }
    ]);
});
router.post('/userValidation', function (req, res) {
    let sqlMethods = new sql();
    var user = req.body.user;
    var password = req.body.password;
    sqlMethods.checkUser(user, password, function (err, result) {
        if (err) {
            res.render('index', { title: 'Node', message: 'Login Form', error: 'Check connection' });
        } else if (result) {
            res.send(result);
        } else {
            res.render('index', { title: 'Node', message: 'Login Form', error: 'Check credentials' });
        }
    })
});
router.get('/getPassword', function (req, res) {
    proc.getPassword('upma', function (err, result) {
        if (err) {
            res.render('index', { title: 'Node', message: 'Login Form', error: 'No user Found' });
        } else {
            res.send('Password for upma is ' + result);
        }
    })
});


module.exports = router;