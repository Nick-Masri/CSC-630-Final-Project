var fs = require("fs");

module.exports = {
  /*
    Creates both tables in the database
  */
  initialize: function(knex){
    knex.schema.hasTable('users').then(function(exists){
      if(!exists) knex.schema.createTable('users', function(table){
        table.integer('facebook_id');
        table.string('name');
      })
      .then(function(){
        console.log("Successfully created 'users' table");
      });
    });

    knex.schema.hasTable('plans').then(function(exists){
      if(!exists) knex.schema.createTable('plans', function(table){
        table.bigInteger('facebook_id');
        table.string('location_name');
        table.string('friends');
        table.integer('amount_payed');
        table.string('date');
      })
      .then(function(){
        console.log("Successfully created 'plans' table");
      });
    });
  },
}
