const express = require('express');
const router = express.Router();
const pengeluaran = require('../model/model-pengeluaran');
const {array_data_pengeluaran, data_pengeluaran} = require("../tools/filter_data");



router.get("/", async (req, res)=>{
    try {
        console.log(`user role ${res.locals.role}`);
        
        let data = await pengeluaran.find();
        data = array_data_pengeluaran(data);
        res.status(200).json({status:200, data});
        
    } catch (error) {
        throw error;
    }
})


router.post("/", async (req, res)=>{
   try{
       
        const {tanggal, nama, jumlah} = req.body;
        const newData = new pengeluaran({
            tanggal, nama, jumlah,
        });
        await newData.save();
        const data = data_pengeluaran(newData);
        console.log(newData);
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

        const {tanggal, nama, jumlah} = req.body;
        // jika option tidak di tentukan makan updatePost akan mengembalikan query dari data sebelum di update
        const options = {new: true}
        const updateData = await pengeluaran.findByIdAndUpdate(req.params.id, {tanggal, nama, jumlah}, options)
        
        if(!updateData){
            return res.status(404).json({status:404, desc:"document tidak ditemukan"})
        }

        const data = data_pengeluaran(updateData);
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

        const target = await pengeluaran.findByIdAndDelete(req.params.id)
        if(!target) {
            return res.status(404).json({status:404, desc:"document tidak ditemukan"})
        }

        const data = data_pengeluaran(target);
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