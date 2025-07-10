require('dotenv').config();

module.exports ={
PORT: process.env.PORT,
MONGO_URI :process.env.MONGO_URI,
ACCESS_TOKEN_SECERT:process.env.REFRESH_TOKEN_SECERT,
REFRESH_TOKEN_SECERT: process.env.REFRESH_TOKEN_SECERT,
NODE_ENV : process.env.NODE_ENV
}