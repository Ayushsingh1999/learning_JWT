const mongoose = require('mongoose')
const { MONGO_URI } = require('./config')

exports.databaseConnect = async () =>
{
    mongoose.connect(MONGO_URI).then(()=>console.log("Database is Connected")).catch((err)=>
    {
        console.log("this is error===>>>",err)
    })
}