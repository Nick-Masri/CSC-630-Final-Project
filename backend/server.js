require('dotenv').config();

const express = require("express");
const app = express();


// Body Parser Setup
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Knex Setup
var knex = require('knex')({
  client: 'pg',
  connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'nick123',
      database : 'EasyEats'
    },
  ssl: true
});
require('knex-paginator')(knex);
const db = require("./db.js");

// Initialize Database
db.initialize(knex);


//////// ROUTES ////////

app.get("/", function(req, res){
    res.send('<h1>Welcome to the API for EasyEat</h1>');
})

// Search users
app.get("/users", function(req, res){
  knex.from("people")
    .select("*")
    .modify(function(queryBuilder){
      if("name" in req.query) queryBuilder.where('search_body', 'like', '%' + req.query.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() + '%');
      if("id" in req.query) queryBuilder.where('facebook_id', req.query.id);
    })
    .paginate(30, req.query.page ? parseInt(req.query.page) : 1) //Paginate
    .then(function(results){
      res.json(results);
    })
    .catch(function(e){
      console.log(e);
      res.status(500);
      res.send("ERROR:" + e);
    });
});

// Search Plans
app.get("/plans", function(req, res){
  knex.from("people")
    .select("*")
    .modify(function(queryBuilder){
      if("id" in req.query) queryBuilder.where('facebook_id', req.query.id);
    })
    .paginate(30, req.query.page ? parseInt(req.query.page) : 1) //Paginate
    .then(function(results){
      res.json(results);
    })
    .catch(function(e){
      console.log(e);
      res.status(500);
      res.send("ERROR");
    });
});


// Create users
app.post("/users", function(req, res) {
  knex("select").select().where("facebook_id", req.body['facebook_id']).then((response) => {
    if (!response.length){ // Check if the username doesn't already exist
      knex("users").insert({
        facebook_id: req.body['facebook_id'],
        name: req.body['name']
      }).then(function() {
        res.status(200).send("successfully added user to database");
      })
    } else {
      res.status(500).send("error");
    }
  })
});

// Create plan
app.post("/plans", function(req, res) {
    knex("plans").insert({
        facebook_id: req.body['facebook_id'],
        location_name: req.body['location_name'],
        friends: req.body['friends'],
        amount_payed: req.body['amount_payed'],
        date: req.body['date']
    }).then(() => {
        res.status(200).send("succesfully added meal to database")
    });
});

// Run Server
app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port " + (process.env.PORT || 3000));
});
