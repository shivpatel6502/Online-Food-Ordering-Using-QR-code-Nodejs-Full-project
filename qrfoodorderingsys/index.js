require("dotenv").config();
const cookieParser=require('cookie-parser');
const express = require('express');
const connection = require('./dbconnection');
const fileUpload = require('express-fileupload');
const req = require("express/lib/request");

app=express();
app.use(express.json());
app.use(fileUpload({useTempFiles:true}))

app.use(cookieParser());

//routes
//menu
app.use('/menu',require('./routes/menuRoutes'));

//for table status and code update
app.use('/tbl',require('./routes/tableRoutes'));

//user login 
app.use('/user', require('./routes/userRoutes'));

//payment
app.use('/',require('./Paytm/paytm'));

//cart
app.use('/cart',require('./routes/cartRoutes'));

//billing prosidure
// app.use('/bill',)

//displ
app.use('/bo',require("./routes/billandorder"))


// DB connection
connection();

const PORT=4000;
app.listen(PORT,()=>{
    console.log(`app running on ${PORT}`);
})