const express = require('express');
const router = express.Router();


router.get("/", (req, res)=>{
    res.cookie('jwt', "", {maxAge:1,httpOnly:true});
    res.status(200).json({desc:"logout success"});
})


module.exports = router;