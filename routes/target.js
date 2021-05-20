const express = require('express');
const router = express.Router();
const target = require("../model/model-target");


router.post("/", async (req, res)=>{
    try {
        // cek if target already exist
        const cek = await target.find();

        if(cek.length){
            await target.findByIdAndUpdate(cek[0]._id,{target:req.body.target}); 
            return res.status(200).json({
                status:201,
                target:req.body.target, 
                desc:"target updated"
            });
        } 

        const set_target = new target({target:req.body.target});
        await set_target.save();
        console.log(set_target);
        res.status(200).json({status:200, desc:"set target success"});
    } catch (err) {
        throw new Error(err);
    }
})


module.exports = router;