const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const path =require('path');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

const port = 3000 ;

const goals = [];

//creating the database connection
mongoose.connect("mongodb://localhost:27017/ZlistDB")
const shcema = {
  goal:String
};

const List = mongoose.model("Goal",shcema)

//setup servers
app.get('/', async (req, res) => {
  try {
    const foundItems = await List.find({});
    res.render('index', { goals: foundItems.map(item => item.goal) });
  } catch (err) {
    console.log(err);
  }
});
app.post('/addGoal', async (req, res) => {
  const newGoal = req.body.input;
  goals.push(newGoal);
  const item = new List({
      goal: newGoal
  });

  try {
    const savedItem = await item.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, function() {
    console.log(`server is listening on port ${port}`);
});

