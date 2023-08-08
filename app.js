const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path =require('path');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(path.join(__dirname,"public")));

const port = 3000 ;

let goals = [];
//adding to the listarray

app.get('/', (req, res) => {
  res.render('index', { goals });
});

app.post('/addGoal', (req, res) => {
    const newGoal = req.body.input;
    goals.push(newGoal);
    res.redirect('/');
});

app.listen(port, function() {
    console.log(`server is listening on port ${port}`);
});

