const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const penerimaan = new Schema({
    tanggal:{
        required:true,
        type:String
    },
    nama:{
        required:true,
        type:String
    },
    jumlah:{
        required:true,
        type:Number
    },
    penerima:{
        required:true,
        type:String
    },
})

module.exports = mongoose.model('penerimaan', penerimaan, "penerimaan");