var db = require('../dbAccess/sqlDb.js');
var mssql = require('mssql');
var authO = require('../nodeMethods/auth');

module.exports = class sql {
    getdata(auth, callback) {
        console.log("@getdata method");
        if (!auth) {
            //res.statusCode = 401;
            callback({ status: 401, msg: 'Invalid Token!' }, null);
        }
        else {
            let [bearer, jwtToken] = auth.split(' ');
            let autho = new authO();
            autho.validateToken(jwtToken, function (err, result) {
                if (err) {
                    callback(err, null);
                }
                else if (result) {
                    let dbCon = new db();
                    dbCon.getCon(function (err, conn) {
                        if (err) {
                            callback(err, null);
                        }
                        else {
                            conn.execute('usp_getMobileDetails')
                                .then(function (data) {
                                    dbCon.closeCon();
                                    callback(null, data);
                                })
                                .catch(function (err) {
                                    dbCon.closeCon();
                                    callback(err, null);
                                });
                        }
                    });
                }
            });
        }
    };
    checkUser(user, password, callback) {
        console.log("@checkUser method");
        let dbCon = new db();
        dbCon.getCon(function (err, conn) {
            if (err) {
                let error = JSON.stringify({ status: 500, msg: 'Connection error' });
                callback(error, null);
            }
            else {
                conn.input('UserName', mssql.VarChar, user);
                conn.input('Password', mssql.VarChar, password);
                conn.execute('usp_GetUserLoginType')
                    .then(function (data) {
                        console.log(data.recordset[0].UserRoleID);
                        dbCon.closeCon();
                        if (data.recordset[0].UserRoleID > 0) {
                            /**
                             * generate token and attatch it to res in callback.
                             */
                            let auth = new authO();
                            auth.generateToken(function (token) {
                                let result = {};
                                result.UserRoleID = data.recordset[0].UserRoleID;
                                result.token = token;
                                result.status = 200;
                                console.log(result);
                                callback(null, result);
                            });
                            //callback(null,data.recordset[0].UserRoleID);
                        }
                        else if (data.recordset[0].UserRoleID == 0) {
                            let result = 0;
                            console.log(result);
                            callback(null, result);
                        }
                    })
                    .catch(function (err) {
                        dbCon.closeCon();
                        console.log(err);
                        callback(error, null);
                    });
            }
        });
    };
}