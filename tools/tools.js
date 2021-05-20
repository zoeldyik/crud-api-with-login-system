const jwt = require('jsonwebtoken');

// payload must be object
const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY,
        {
            expiresIn: "7d"
        })
}



const cekAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(`CEK AUTH TOKEN ${token}`);

    if (token) {
     jwt.verify(token, process.env.JWT_KEY,(err, decoded)=>{

        if(err) {
            console.log(`CEK AUTH ERROR ${err}`);
            res.status(401).json({desc:"unauthorized"});
        }else{
            console.log(`CEK AUTH SUKSES`);
            res.locals.role = decoded.role;
            next();
        }

     })
    } else {
      res.status(401).json({desc:"unauthorized"});
    }
}


module.exports = {createToken, cekAuth};