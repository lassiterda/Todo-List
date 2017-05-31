//main module requires
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require('handlebars');
const Promise = require('bluebird');

require('express-handlebars');

//require for dotenv, importing environment variables contained in .env file.
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

//require for mysql, and promisifyAll from bluebird to make asynchronous
const mysql = require('mysql');
Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

//Databse connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lassiterda",
  database: "todo_list_db"
});

//main GET handler which serves all todo's and
app.get("/", function(req, res) {
  connection.queryAsync("SELECT id, todo_text, complete FROM todo_items")
  .then(function(data) {
    let splitList = {
      incomplete: data.filter(function(ele) {
        return ele.complete === 0
      }),
      completed: data.filter(function(ele) {
        return ele.complete === 1
      })
    }
    res.render("index", {data: splitList});
  })
});


app.post("/api/create", function(req, res) {
  connection.queryAsync("INSERT INTO todo_items (todo_text) VALUES (?)", [req.body.todo_text])
  .then((response) => {
    console.log(response);
    if(response) {
      res.send(true);
    }
    else {
      res.send(false)
    }
  })
})


app.post("/api/delete/:id", function(req, res) {
  let todo_id = req.params.id;
  connection.queryAsync("DELETE FROM todo_items WHERE id = ?",[todo_id])
  .then(function(response){
    if(response) {
      res.send(true)
    }
    else {
      res.send(false)
    }
  })
})

//Complete for individual Todo Items
app.post("/api/complete/:id", function(req, res) {
  let todo_id = req.params.id;
  connection.queryAsync("UPDATE todo_items set complete = true WHERE id = ?", [todo_id])
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


const getNewTodo = function(obj) {

}
