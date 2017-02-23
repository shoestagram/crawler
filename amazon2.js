//=====initializing MySQL======================
var mysql = require('promise-mysql');

var conn = mysql.createPool({
    host: 'localhost',
    user: 'myeoh27',
    password: '',
    database: 'shoestagram',
    connectionLimit: 10
});
//=============initializing amazon API=========

//reference: https://github.com/dmcquay/node-apac
const {OperationHelper} = require('apac');

const opHelper = new OperationHelper({
    awsId: 'AKIA',
    awsSecret: 'xe',
    assocId: '20'
});


//====================================================
var queryStr = `
                SELECT
                  id,
                  date_created,
                  date_updated,
                  media_url,
                  thumbnail_url,
                  text,
                  keyword,
                  norm_description,
                  source_url,
                  source_user,
                  source_id,
                  crawled_retails_shops,
                  crawled_shops_links,
                  shop_url
                FROM media
            `; 

conn.query(queryStr)
    .then(function(mediaItems) {

        mediaItems.forEach(function(mediaItem) {
            var words = mediaItem.keyword;
            var newWords = words.split(", ")
                .filter(value => value.length > 3)
                .slice(0, 3)
                .join(" "); //refine? some of the queries return nothing
            //some return no price

            //then for each mediaItem, do amazon "fetch" for shopping links
            opHelper.execute('ItemSearch', {
                'SearchIndex': 'Shoes',
                'Keywords': newWords,
                'ResponseGroup': 'ItemAttributes,Offers'
            }).then((response) => {
                var items = response.result.ItemSearchResponse.Items.Item;
                // console.log("items: ",  items);
                // console.log("item 1's url: ", items[0].DetailPageURL);
                // console.log("item 1's description: ", items[0].ItemAttributes.Title)
                // console.log("item 1's listprice: ", items[0].ItemAttributes.ListPrice.FormattedPrice); //Returns price in $6.97 USD. If want no decimals, but in cents to keep number purity, ListPrice.Amount
                // console.log("item 1's lowestnewprice: ", items[0].OfferSummary.LowestNewPrice.FormattedPrice); //if want cents, target LowestNewPrice.Amount

                //only return max of 5 amazon links per media item 
                var length;
                if (items.length > 5) {
                    length = 5;
                }
                else {
                    length = items.length;
                }

                var link;
                var links = [];
                for (var i = 0; i < length; i++) {
                    link = {
                        date_created: new Date(),
                        price: (items[i].ItemAttributes.ListPrice) ? items[i].ItemAttributes.ListPrice.FormattedPrice : null,
                        url: items[i].DetailPageURL,
                        description: items[i].ItemAttributes.Title,
                        media_id: mediaItem
                    };

                    links.push(link);
                }


                //insert into shop_links table
                var queryStr = `
                  INSERT INTO shop_links VALUES (null, now(), now(), ?, ?, ?, ${mediaItem.id})
                `;

                links.forEach(function(link) {
                    conn.query(queryStr, [link.price, link.url, link.description])
                        .then(function(result) {
                            console.log(result); //should just confirm that row was inserted
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                }); //closes forEach loop of links. should have inserted 5 links to the mediaID




            }).catch((err) => {
                console.error("Something went wrong! ", err);
            }); //closes "fetch" for amazon links

        }); //ends the forEach loop through the media table


    })
    .catch(function(error) {
        console.log(error);
    }); //catches errors from getting media table
