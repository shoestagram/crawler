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
    // setTimeout(function() {
    //     connection.end();
    // }, 2000);
});



// tumblrAPI.getAllMedia(function(error, response){
//     if(error){
//         throw error;
//     }
    
//     console.log(response); //works
    
//     console.log(response[1].source_id);//works
//     connection.end();
// });

// tumblrAPI.getPhotosFromBlog(function(error, response){
//     if(error){
//         throw error;
//     }
    
//     //console.log(response);
//     console.log("# of photos: ", response.length);
// })

// //NOTE: THIS FUNCTION DOES NOT WORK!===============
// tumblrAPI.getAllPhotos();