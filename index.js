const express = require("express");
const app = express();
const port = 5000;



// ----------view engine EJS-----------//
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




app.listen(port,()=>{
   console.log(`Click this link to get started :  http://localhost:${port}`); 
})