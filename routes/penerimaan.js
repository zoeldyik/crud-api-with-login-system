const express = require('express');
const router = express.Router();
const penerimaan = require('../model/model-penerimaan');
const {array_data_penerimaan, data_penerimaan} = require("../tools/filter_data");


router.get("/", async (req, res)=>{
    try {
        console.log(`user role ${res.locals.role}`);
        
        let data = await penerimaan.find();
        data = array_data_penerimaan(data);
        res.status(200).json({
                status:200, 
                data
            });
        
    } catch (error) {
        throw error;
    }
})


router.post("/", async (req, res)=>{
    try{
        const {tanggal, nama, jumlah, penerima} = req.body;
        let newData = new penerimaan({
            tanggal, nama, jumlah, penerima 
        });
        await newData.save();
        const data = data_penerimaan(newData);
        res.status(200).json({
            status:200, 
            desc:"data berhasil di tambahkan", 
            data
        })

    } catch(error) {
        throw new Error(error);
    }
})


router.patch("/:id", async (req, res)=>{
    try{
        const {tanggal, nama, jumlah, penerima} = req.body;
        // jika option tidak di tentukan makan updatePost akan mengembalikan query dari data sebelum di update
        const options = {new: true};
        const updateData = await penerimaan.findByIdAndUpdate(req.params.id, {tanggal, nama, jumlah, penerima}, options);
        
        if(!updateData){
            return res.status(404).json({status:404, desc:"document tidak ditemukan"})
        }
        
        const data = data_penerimaan(updateData);
        res.status(200).json({
            status:200, 
            desc:"data berhasil di update", 
            data
        });

    } catch(error){
        throw new Error(error);
    }
})


router.delete("/:id", async (req, res)=>{
    try{

        const target = await penerimaan.findByIdAndDelete(req.params.id)
        if(!target) {
            return res.status(404).json({status:404, desc:"document tidak ditemukan"})
        }

        const data = data_penerimaan(target);
        res.status(200).json({
            status:200, 
            desc:"data berhasil di hapus", 
            data
        });

    } catch(error){
        throw new Error(error);
    }
})


module.exports = router;