require('dotenv').config();
require("./model/db");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { cekAuth } = require("./tools/tools");
const morgan = require("morgan");
const helmet = require("helmet");
const port = process.env.PORT || 4000;
const app = express();


app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({
    origin:"https://tastes-simple-dashboard.netlify.app" ,
    credentials: true
    }));
app.use(cookieParser());
app.use(express.json());

// import routes
const all_data = require("./routes/get_all_data");
const pengeluaran = require('./routes/pengeluaran');
const penerimaan = require('./routes/penerimaan');
const login = require("./routes/log-in");
const logout = require("./routes/log-out");
const target = require("./routes/target");
const users = require("./routes/users");



app.use('/all', cekAuth, all_data);
app.use('/pengeluaran', cekAuth, pengeluaran);
app.use('/penerimaan', cekAuth, penerimaan);
app.use('/target', cekAuth, target);
app.use('/login', login);
app.use('/logout', logout);
app.use('/users', users);

// 404 handler
app.use("/*", (req, res) => {
    res.status(404).json({status:404, desc:"route not found"})
})

// error handler
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).json({status:500, desc:"internal server error"})
})

app.listen(port,()=>console.log('server live'))
