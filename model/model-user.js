const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    role:{
        default:"user",
        type: String
    }
})




module.exports = mongoose.model('user', user, "users");