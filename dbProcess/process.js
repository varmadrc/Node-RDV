var db = require('../dbAccess/data');

class processes {
    checkUser(user,password,callback) {
        var userExist = false;
        for(var i=0;i<db.length;i++) {
            if(db[i]["name"]==user && db[i]["password"]==password) {   
                userExist = true;
                break;
            }
        }
        if(userExist) {
            callback(null,"login");
        } else {
            callback("failed",null);
        }
    } 
}

module.exports = processes;