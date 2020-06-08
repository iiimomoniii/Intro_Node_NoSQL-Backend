//central files of project
require('dotenv').config();

//assign port
module.exports = {
    PORT : process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    DOMAIN : process.env.DOMAIN,
    JWT_SECRET : process.env.JWT_SECRET,
    MONGODB_User : process.env.MONGODB_Username,
    MONGODB_Pass : process.env.MONGODB_Password

}