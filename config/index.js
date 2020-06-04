//central files of project
require('dotenv').config();

//assign port
module.exports = {
    PORT : process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    DOMAIN : process.env.DOMAIN
}