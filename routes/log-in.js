const express = require('express');
const router = express.Router();
const USER = require('../model/model-user');
const bcrypt = require("bcrypt");
const { createToken } = require('../tools/tools');

router.post("/", async (req, res)=>{
    try {
        const {username, password} = req.body;

        // cek jika user sudah terdaftar       
        const user = await USER.findOne({username});
        if(!user){
            return res.status(401).json({status:401, desc:"1 username / password salah"})
        }

        // cek password
        const cekPassword = await bcrypt.compare(password, user.password);
        if(!cekPassword){
            return res.status(401).json({status:401, desc:"username / password salah"})
        } 

        // buat token
        const token = createToken({id:user._id, role:user.role});

        res.cookie('jwt', token, {httpOnly:true, sameSite:"none", secure:true});
        res.status(200).json({
                status:200, 
                user:{
                    username: user.username, 
                    role:user.role
                }
            });

    } catch (error) {
        throw new Error(error);
    }

})


module.exports = router;
