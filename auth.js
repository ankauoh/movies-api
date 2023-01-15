const jwtSecret = 'your_jwt_secret'; //this is the key from the passport.js, it must be identical to the key from JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // this is my local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //this is the username that needs to be encoded within the Token
    expiresIn: '7d', //his specifies the duration of the token
    algorithm: 'HS256' //this is the algorithm for signing/encoding values of JWT
  });
}

/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
