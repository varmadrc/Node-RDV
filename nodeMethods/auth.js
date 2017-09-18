/**
 * Author: RDV-Cloudium.
 * Description: a js file to generate and validate tokens using JWT module.
 * For generation, if user is verified from db, generate a token and return it along wtin the response.
 * For validation of the token, verify the token and send err or result
 */

let jwt = require('jwt-simple');
let config = require('../config/jwtConfig');


module.exports = class Auth {
    /**
     * generation of token.
     * Params: callback function.
     */
    generateToken(callback) {
        let payload = {
            issuerTag: config.issuerTag,
            exp: Math.floor(new Date().getTime() + 60 * 60 * 24 * 1000)
        };
        let jwt_token = jwt.encode(payload, config.jwt.secret);
        callback(jwt_token);
    };


    /**
     * Validation of token.
     * Params: token to be decoded and callback function.
     */
    validateToken(token, callback) {
        try {
            let token_details = jwt.decode(token, config.jwt.secret);
            console.log(token_details);
            callback(null, token_details);
        } catch (err) {
            callback(err, null);
        }
    };
}