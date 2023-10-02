const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express()
var newTask = ["Cook Food", "Laundry", "Update Blog Website"];
var workList = [];
var officeList = []
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))

app.get("/", function(req, res) {

var day = date.getDate()

  res.render("list", {
    typeofday: day,
    typedList: newTask,
  })
})

app.post("/", function(req, res) {
  var newTasks = req.body.listItem;
  if (req.body.button === "Work") {
    workList.push(newTasks)
    res.redirect("/work")
  } else if (req.body.button === "Office" ) {
       officeList.push(newTasks)
       res.redirect("/officework")
  } else {
    newTask.push(newTasks);
    res.redirect("/")
  }


})

app.get("/work", function(res, res) {
  res.render("list", {
    typeofday: "Work List",
    typedList: workList,
  })
})

app.get("/officework" , function(req , res){
  res.render("list",{ typeofday:"Office Work", typedList: officeList })
})

app.listen(3000, function() {
  console.log("running");
})
