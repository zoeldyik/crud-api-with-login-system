const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const target = new Schema({
    target:{
        required:true,
        type:Number
    }
})

target.pre('save', async function(next){
    console.log("model target pre save");
    console.log(this);
    next()
})

module.exports = mongoose.model('target', target, "target");