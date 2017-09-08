var db = require('../dbAccess/data');

module.exports = {
    "getPassword": function(name,callback) {
        var userPassword;
        for(var i=0; i<db.length; i++){
            if(db[i]["name"]==name) {
                userPassword = db[i]["password"];
                break;
            }
        }
        if(userPassword) {
            callback(null,userPassword);
        } else {
            callback('NoUserFound',null);
        }
    }
};