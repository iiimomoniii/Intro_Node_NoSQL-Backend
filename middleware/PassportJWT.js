//import config
const config = require('../config/index');

//import user
//check user in system
const User = require('../models/user');

//import passport
const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
//token from client
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//use config.JWT_SECRET 
opts.secretOrKey = config.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
passport.use( new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload._id);
    try {
        const user = await User.findById(jwt_payload.id);
        if(!user){
            return done(new Error('Not found user'), null);
        } else {
            return done(null, user);
        }
    } catch (error) {
        done(error);
    }

  })
);

//export authen
module.exports.isLogin = passport.authenticate('jwt', { session: false });
