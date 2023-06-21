const exp = require('constants');
const express = require('express');
const port = 8000;
const path = require("path");
const db = require('./config/mongoose');
const Contact = require("./models/task");
const TaskTable = require('./models/task');

const app = express();

app.use(express.urlencoded());

//setting view engine
app.set('view engine', "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static('assets'));
app.get("/", (req,res)=>{
    var newDate= new Date().toISOString().slice(0,10);
    var today_date = newDate.toString();
    var query = {date: today_date};
    TaskTable.find(query)
    .then(function(data,err){
        if(err){
            console.log("error while retrieving data");
        }
        res.render('index', {list_data: data});
    })
});


app.post("/add-task/", function(req,res){
    var newDate= new Date().toISOString().slice(0,10);
    var today_date = newDate.toString();
    
    var obj = {
        completed: false,
        task_name : req.body.task,
        task_type : req.body.work_type,
        date: today_date
    };

    TaskTable.create(obj)
    .then(()=>{
        return res.redirect('back');
    })
});


app.post('/delete-task/', (req,res)=>{
    TaskTable.findByIdAndDelete({_id:req.body.id})
    .then(()=>{
        return res.redirect('back');
    });
});

app.post("/update-task/", async function(req,res){
    // TaskTable.findByIdAndUpdate({_id:req.body.id, {completed: true}})
    // .then(()=>{
    //     return res.redirect("back")
    // });

    // return res.redirect('back');
    const filter = {_id : req.body.id};
    const update = {completed : true};
    try{
        const result = await TaskTable.findOneAndUpdate(filter, update)
        if(!result) {
            res.status(404).send({error: "Post is not find !"})
    }
    }catch(err){
    res.status(500).send({error: err })
    }
    return res.redirect('back');
});

app.listen(port, (err)=>{
    if(err){
        console.log("Error in running server");
        return;
    }
    console.log("Server running at port:", port);
});