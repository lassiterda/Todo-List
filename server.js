const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require('handlebars');

require('express-handlebars');

const dotenv = require('dotenv');

//Init for express server and PORT variable
const app = express();
const PORT = 3000;
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({ extended: false }));
//configuring express-handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Databse connection

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.password,
  database: "day_planner_db"
});


app.get("/", function(req, res) {
    res.render("index");

});

app.listen(PORT);
