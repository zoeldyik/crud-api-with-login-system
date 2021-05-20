const express = require('express');
const router = express.Router();
const USER = require("../model/model-user");
const bcrypt = require('bcrypt');


router.get("/", async (req, res)=>{
    try {
        let users = await USER.find();

        users = users.filter(user=> user.role === "user")
        .map(user=>{
            return{
                username:user.username,
                id:user._id
            }
        })

        res.status(200).json({status:200, data:users});
    } catch (err) {
        throw new Error(err);
    }
})


router.post("/add", async (req, res)=>{
    try {
        if(res.locals.role ==  "user"){
            return res.status(401).json({status:401, desc:"unauthorized"});
        }

        let {username, password} = req.body;

        // cek jika user sudah terdaftar
        const cekUser = await USER.findOne({username});
        console.log(`sign up user is ${cekUser}`);

        if(cekUser){
            return res.status(400).json({status:400, desc:"user already exist"});
        }

        password = await bcrypt.hash(password, 10);

        const new_user = await USER.create({username, password});
        console.log(new_user);
        res.status(200).json({
            status:201, 
            desc:"user berhasil di tambahkan",
            data:{
                id : new_user._id,
                username : new_user.username
            } 
        });

    } catch (error) {
        throw new Error(error);
    }

})


router.patch("/:id", async (req, res)=>{
    try {
        if(res.locals.role ==  "user"){
            return res.status(401).json({status:401, desc:"unauthorized"});
        }
        const password = await bcrypt.hash(req.body.password, 10);

        await USER.findByIdAndUpdate(req.params.id,{password});
        res.status(200).json({status:200, desc:"change password success"});
    } catch (error) {
        throw new Error(error);
    }
})


router.delete("/:id", async (req, res)=>{
    if(res.locals.role ==  "user"){
        return res.status(401).json({status:401, desc:"unauthorized"});
    }

    try {
        const response = await USER.findByIdAndDelete(req.params.id);
        res.status(200).json({status:200, id:response._id, desc:"1 user deleted"});
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = router;