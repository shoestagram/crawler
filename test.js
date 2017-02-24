
// //unique array function
// function unique(arr1, arr2) {
//     var uniqueArr = [];
//     var uniqueIds = [];

//     var ids1 = arr1.map(item => item.id);
//     var ids2 = arr2.map(item => item.id);
    
    
//     ids1.forEach(function(item){
//         if(ids2.indexOf(item) === -1){
//             uniqueIds.push(item);
//         }
//     });
    
    
//     arr1.forEach(function(eachObject){
//         uniqueIds.forEach(function(eachID){
//             if(eachObject.id === eachID){
//                 uniqueArr.push(eachObject)
//             }
//         });
//     });
    
//     return uniqueArr;
// }

// var arr1 = [{
//         id: 123,
//         url: 'http://google.ca'
//     }, {
//         id: 45,
//         url: 'http://yahoo.ca'
//     },
//     {
//         id: 002,
//         url: 'http://bing.com'
//     },
//     {
//         id: 33,
//         url: 'http://netscape.net'
//     }
// ];

// var arr2 = [
//     {
//         id: 002,
//         url: 'http://bing.com'
//     },
//     {
//         id: 33,
//         url: 'http://netscape.net'
//     }
// ];

// console.log(unique(arr1, arr2));


//taking keywords in string form, 

// var words = 'Adidas, Ultra Boost, Ultraboost, Boost, Ronnie Fie';
// var newWords =words.split(", ")
//     .filter(value => value.length>3)
//     .slice(0,3)
//     .join(" ");

// console.log(newWords);



//=====================AMAZON FETCH TEST========================================
const {
    OperationHelper
} = require('apac');

const opHelper = new OperationHelper({
    awsId: 'AKIA',
    awsSecret: 'xedCl',
    assocId: 's0'
});

// opHelper.execute('ItemSearch', {
//     'SearchIndex': 'Shoes',
//     'Keywords': newWords,
//     'ResponseGroup': 'ItemAttributes,Offers'
// }).then((response) => {
//     console.log("Results object: ", response.result);

//     var items = response.result.ItemSearchResponse.Items.Item;
//     console.log("items: ",  items);
//     // console.log("item 1's url: ", items[0].DetailPageURL);
//     // console.log("item 1's description: ", items[0].ItemAttributes.Title)
//     //console.log("item 1's listprice: ", items[0].ItemAttributes.ListPrice.FormattedPrice); //Returns price in $6.97 USD. If want no decimals, but in cents to keep number purity, ListPrice.Amount
//     //console.log("item 1's lowestnewprice: ", items[0].OfferSummary.LowestNewPrice.FormattedPrice); //if want cents, target LowestNewPrice.Amount
    
//     // var counter =0;
    
//     // items.forEach(function(item){
//     //     if(item.ItemAttributes.ListPrice){
//     //         counter = counter +1;
//     //     }
//     // })
    
//     // console.log("# of items with price: ", counter);
//     console.log("# of items: ", items.length);

//     //item links -- not needed!
//     //console.log("item 1's itemlinks: ", items[0].ItemLinks);
//     //console.log("Raw response body: ", response.responseBody); //xml response
// }).catch((err) => {
//     console.error("Something went wrong! ", err);
// });

//==============testing ItemLookup=======================================

opHelper.execute('ItemLookup', {
    'ItemId': 'B010UT7NXC',
    'ResponseGroup': 'Offers,OfferSummary'
}).then((response) => {
    console.log("Results object: ", response.result.ItemLookupResponse.Items);
}).catch((err) => {
    console.error("Something went wrong! ", err);
});

//does not work. price still isn't showing upon ItemLookup query