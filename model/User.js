const mongoose = require("mongoose");



const userSchema =  new mongoose.Schema({
    username:{type:String,unique:true},
    password:String,
    role:{type:String,enum:['user','admin'],default:'user'},
    refreshToken:String,
});


module.exports = mongoose.model('User',userSchema);