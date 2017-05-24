//main module requires
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require('handlebars');
const Promise = require('bluebird');

require('express-handlebars');

const dotenv = require('dotenv');

//Init for express server and PORT variable
const app = express();
const PORT = 3000;

//mounting static assets middleware
app.use(express.static(__dirname + "/assets"));

//mounting body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

//configuring express-handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Databse connection

const mysql = require('mysql');
Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lassiterda",
  database: "todo_list_db"
});


app.get("/", function(req, res) {
  connection.queryAsync("SELECT id, todo_text FROM todo_items")
  .then(function(data) {
    res.render("index", {data: data});
  })
});

app.post("/", function(req, res) {
  connection.queryAsync("INSERT INTO todo_items (todo_text) VALUES (?)", [req.body.todo_text])
  .then((response) => {
    if(response) {
      res.send(true)
    }
    else {
      res.send(false)
    }
  })
})

app.post("/:id", function(req, res) {
  let todo_id = req.params.id;
  connection.queryAsync("DELETE FROM todo_items WHERE id = ?", [todo_id])
  .then(function(response) {
    if(response) {
      res.send(true)
    }
    else {
      res.send(false)
    }
  })
})
app.listen(PORT);
