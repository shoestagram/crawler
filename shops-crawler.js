//This file based on address of each shop, finds its geo-coordinates, and inserts it into retail_shops table

//=====initializing MySQL======================
var mysql = require('promise-mysql');
var requestPromise = require('request-promise');


var conn = mysql.createPool({
    host: 'localhost',
    user: 'myeoh27',
    password: '',
    database: 'shoestagram',
    connectionLimit: 10
});


//============converting geo_loc to object of lat and long===========
function toLatLng(geo_loc){
    //var array = "45 -73".split(" ").map(element => +element); //returns [45, -73]
    var array = geo_loc.split(" ")
                .map(element => +element);
                
    var latLng = { lat: array[0], lng: array[1]};
    return latLng;
}

function getGeo(address) {
    var key=`AIzaS`; 
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
    console.log("before request!");
    
    return requestPromise(url)
        .then(function(result) {
            //console.log("got lat and long!!");
            
            
            var userData = JSON.parse(result);
            
            //console.log("result of REQUEST: ", userData);

            var userLat = +userData.results[0].geometry.location.lat;
            var userLon = +userData.results[0].geometry.location.lng;
            
            var geo= `${userLat} ${userLon}`;
            
            return geo;

        });
}
//=============EXECUTING=========
var queryStr = `
                SELECT
                    id, 
                    address,
                    city,
                    province
                FROM retail_shops
            `; 

conn.query(queryStr)
.then(function(shopItems) {

    var addresses = shopItems.map( function(element){
        return {
            id: element.id,
            add: `${element.address}+${element.city}+${element.province}`
        }
    });
    
    console.log(addresses);
     addresses.map(function(element){
        getGeo(element.add)
        .then( (geoResponse)=> {

            //insert to retail_shops table
            var queryStr = `
                  UPDATE retail_shops SET geo_loc='${geoResponse}' where id=${element.id}
                `;
            
            conn.query(queryStr)
            .then(function(response){
                console.log(response);
                console.log(" inserted to table where id = ", element.id);
            })
            .catch(function(error){
                console.log(error);
            });
             
            
        })
        .catch(function(error){
             console.log(error);
        })
         
     });
     
    
    //conn.end();
})
.catch(function(error){
    console.log(error);
    
    //conn.end();
})