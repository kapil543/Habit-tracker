const express = require("express");
const path=require ('path');
const app = express();

const moment=require('moment');

const mongoose= require('mongoose');
const db=require('./config/mongoose');
const expressLayout=require('express-ejs-layouts');


const port = 5000;

//----->Statics files--------------->
app.use(express.static(path.join(__dirname,'./assets')));
app.use(express.urlencoded());

 

// ----------view engine EJS-----------//
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ---------ejs layouts----------->
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//--------------- Router--------//
app.use('/',require('./routes'))



app.listen(port,()=>{
   console.log(`Click this link to get started :  http://localhost:${port}`); 
})