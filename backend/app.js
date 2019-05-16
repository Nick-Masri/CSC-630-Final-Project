equire('dotenv').config();

const express = require("express");
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Body Parser Setup
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Knex Setup
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: true
});
require('knex-paginator')(knex);
const db = require("./db.js");

// Encryption
const bcrypt = require("bcrypt-nodejs");

// Initialize Database
db.initialize(knex);

// Initialize Passport


//////// ROUTES ////////




// Run Server
app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port " + (process.env.PORT || 3000));
});
