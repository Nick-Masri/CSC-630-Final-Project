var fs = require("fs");

module.exports = {
  /*
    Creates both tables in the database
  */
  initialize: function(knex){
    knex.schema.hasTable('users').then(function(exists){
      if(!exists) knex.schema.createTable('users', function(table){
        table.increments('user_id');
        table.string('email');
        table.string('password');
      })
      .then(function(){
        console.log("Successfully created 'users' table");
      });
    });

    knex.schema.hasTable('place').then(function(exists){
      if(!exists) knex.schema.createTable('people', function(table){
        table.increments('id');
        table.string('location');
        table.string('friends');
        table.integer('amount_payed');
        table.integer('stars');
      })
      .then(function(){
        console.log("Successfully created 'people' table");
      });
    });
  },

}
