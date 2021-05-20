const express = require('express');
const router = express.Router();
const penerimaan = require("../model/model-penerimaan");
const pengeluaran = require("../model/model-pengeluaran");
const target = require("../model/model-target");
const {array_data_penerimaan, array_data_pengeluaran} = require("../tools/filter_data");


router.get("/", async (req, res)=>{
    try {
        let data_target = await target.find();
        let data_penerimaan = await penerimaan.find();
        let data_pengeluaran = await pengeluaran.find();

        data_penerimaan = array_data_penerimaan(data_penerimaan);
        data_pengeluaran = array_data_pengeluaran(data_pengeluaran);
        if(!data_target.length){
            data_target = 0;
        }

        res.status(200).json({status:200, data:{
            penerimaan:  data_penerimaan,
            pengeluaran:  data_pengeluaran,
            target: data_target[0].target
        }})
    } catch (err) {
        throw new Error(err);
    }
})


module.exports = router;