const jwt = require('jsonwebtoken');

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

module.exports = (req, res, next) => {

    let token = req.headers['x-access-token'] || req.headers['auth-token']; // Express headers are auto converted to lowercase

    if (token) {
        jwt.verify(token, 'manohar@rtf', (err, decoded) => {
            if (err) {
                res.status(401).json({
                    status: false,
                    msg: 'Unauthorized user, Kindly Change Your Board or Class'
                }); return res.end();
            } else {
                req.decodedToken = decoded;
                req.appBaseConfig = req.decodedToken;
                next();
            }
        });
    } else {
        res.json({
            status: false,
            message: 'No Valid Token Provided.'
        }); return res.end();
    }
};