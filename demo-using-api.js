// load the mysql callback library
var mysql = require('mysql');

//NOTE: see secret.js to log in to proper MySQL database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'myeoh27',
  password : '',
  database : 'shoestagram'
});

// load our API and pass it the connection
var tumblrrr = require('./tumblah');
var tumblrAPI = tumblrrr(connection); 


//==========CODE EXECUTION=======================

tumblrAPI.insertPhotos(function(error, response){
    if(error){
        throw error;
    }
    
    console.log("AFTER insert: ", response);
});

