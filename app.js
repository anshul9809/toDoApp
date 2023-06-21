const exp = require('constants');
const express = require('express');
const port = 8000;
const path = require("path");

const app = express();

app.use(express.urlencoded());

//setting view engine
app.set('view engine', "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static('assets'));
app.get("/", (req,res)=>{
    res.render('index');
});


app.post("/add-task", function(req,res){
    console.log(req.body);
});
app.listen(port, (err)=>{
    if(err){
        console.log("Error in running server");
        return;
    }
    console.log("Server running at port:", port);
});