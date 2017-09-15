var db = require('../dbAccess/sqlDb.js');
var mssql = require('mssql');

module.exports = class sql {
    getdata(callback){
        console.log("@getdata method");
        let dbCon = new db();
        dbCon.getCon(function(err,conn) {
            if(err) {
                let error = JSON.stringify({status:500,msg:'Connection error'});
                callback(error,null);
            }
            else {
                conn.execute('usp_getMobileDetails')
                .then(function(data) {
                    dbCon.closeCon();
                    callback(null,data);
                })
                .catch(function(err) {
                    dbCon.closeCon();
                    callback(error,null);
                });
            }
        });
    }
    checkUser(user,password,callback) {
        console.log("@checkUser method");
        let dbCon = new db();
        dbCon.getCon(function(err,conn) {
            if(err) {
                let error = JSON.stringify({status:500,msg:'Connection error'});
                callback(error,null);
            }
            else {
                conn.input('UserName', mssql.VarChar, user);
                conn.input('Password', mssql.VarChar, password);
                conn.execute('usp_GetUserLoginType')
                .then(function(data) {
                    console.log(data);
                    dbCon.closeCon();
                    callback(null,data);
                })
                .catch(function(err) {
                    dbCon.closeCon();
                    callback(error,null);
                });
            }
        });
    }
}