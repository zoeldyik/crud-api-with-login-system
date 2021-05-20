const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pengeluaran = new Schema({
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
})

module.exports = mongoose.model('pengeluaran', pengeluaran, 'pengeluaran');