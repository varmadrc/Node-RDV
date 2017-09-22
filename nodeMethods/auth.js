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
     * Step 1. Create payload with issuerTag from config and expiry time in seconds
     * Step 2. Encode the payload and secret from config using jwt encode method.
     * Step 3. callback with created token as parameter.
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
     * Step 1. Decode the token, using jwt decode method with token and secret from config as parameters.
     * step 2. check if token expired. If within limits, callback with no error(null) and details or some value as parameters. 
     */
    validateToken(token, callback) {
        try {
            let token_details = jwt.decode(token, config.jwt.secret);
            console.log(token_details);
            console.log(Math.floor(new Date().getTime()));
            if (token_details.exp > Math.floor(new Date().getTime())) {
                callback(null, token_details);
            }
            else {
                console.log('time expired');
                callback('time expired', null);
            }
        } catch (err) {
            callback(err, null);
            console.log("@validate catch");
        }
    };
}