//=====initializing MySQL======================
var mysql = require('promise-mysql');

var conn = mysql.createPool({
    host: 'localhost',
    user: 'myeoh27',
    password: '',
    database: 'shoestagram',
    connectionLimit: 10
});
//=============EXECUTING=========
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
                if (mediaItem.shop_url) {
                    var algo = mediaItem.shop_url
                        .replace(/^https?\:\/\//i, "")
                        .split(".");
                    //this takes each media's shop_url, removes the "http://" from string, and gets the domain name to be the first element in the array (i.e. "fave", "click", or "bit")

                    if (algo[0] === "fave") {
                        var queryStr = `INSERT INTO shop_links (date_created, source, url, description, media_id) VALUES (now(), "other", "${mediaItem.shop_url}", "${mediaItem.text}", ${mediaItem.id})`;

                        conn.query(queryStr)
                            .then(function(result) {
                                console.log(result);
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }
                }
        });

    })
    .catch(function(error) {
        console.log(error);
    })
