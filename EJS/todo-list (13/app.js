const express = require("express");

const bodyParser = require("body-parser");

const date = require(__dirname+"/date.js");

//console.log(date());

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set('view engine','ejs');

const items=["Buy Food","Cook Food","Eat Food"];

const workItems = ["Baked"];

app.get("/",function(req,res){

 // var day =   date();

 var day = date.getDate();

 //var day = date.getDay();

res.render("list",{ listTitle: day, newListItems:items});
});

app.post("/",function(req,res){
console.log(req.body);
    var item = req.body.newItem;

if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");

}else{
    items.push(item);
    res.redirect("/");
}

});

app.get("/work", function(req,res){

    res.render("list",{listTitle: "Work List", newListItems:workItems });

});

// app.post("/work", function(req,res){

//     var item = req.body.newItem;

//     workItems.push(item);

//     res.redirect("/work");

// });


app.listen(3000,function(){

    console.log("server started");

});

app.get("/about",function(req,res){

res.render("about");

});



// object & array don't stay constant just can't assign to new ones.

// THEMPLATE VS LAYOUT(header footer)
//we added work which is template of our project 