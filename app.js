const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.set("view engine", "ejs");
mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items =["Buy Food", "Cook Food", "Eat Food"];
// let workItems = [];

const itemSchema = {
    name: String
}

const Item = mongoose.model("Item", itemSchema);
const Work = mongoose.model("Work", itemSchema);

const item1 = new Item({
    name: "Welcome to your to do list"
});

const item2 = new Item({
    name: "Add new work here"
});

const item3 = new Item({
    name: "I m here to serve you;"
});


app.get("/", (req, res) => {


    
    
    Item.find({},(err, foundItems) => {

        if(foundItems.length === 0){
            Item.insertMany([item1, item2, item3], (err) => {
                if (err) { console.log(err);
                 }else{
                    console.log("Success");
                 }
            });
            res.redirect("/");
        }else{
            res.render("list", { listTitle: "Home", newListItems: foundItems });
        }

     });
    


});

app.post("/", (req, res) => {
    
    const itemName =req.body.newItem;

    const item = new Item({
        name: itemName 
    });

    item.save();
    res.redirect("/");

});

app.get("/work", (req, res) => {
    Work.find({},(err,foundItems)=>{
        if(err){console.log(err)}
        res.render("list", { listTitle: "Work List", newListItems: foundItems });
    });
    
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});