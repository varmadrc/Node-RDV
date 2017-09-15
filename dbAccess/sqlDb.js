var db = require('mssql');
var config = require('../config/dbConfig');

module.exports = class dbs {
    getCon(callback) {
        console.log("@db");
        db.connect(config, function(err) {
            if(err) {
                console.log("@connection error " + err);
                var error = JSON.stringify({status:401,msg:'Invalid credentials'});
                callback(error,null);
            }
            else {
                console.log("@connection");
                var request = new db.Request();
                callback(null,request);
            }
        });
    }
    closeCon() {
        console.log("@close");
        db.close();
    }
}