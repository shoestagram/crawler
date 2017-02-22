var tumblr = require('tumblr');

//NOTE: see secret.js for proper oauth keys
var oauth = {
    consumer_key: 'Up',
    consumer_secret: '9B',
    token: 'yQ',
    token_secret: 'kI'
};


//=============RE-USABLE FUNCTIONS=============================================
function shoePostsOnly(blogName, el) {
    /*
      LOGIC 
      1. First filter through posts and keep only posts that have tags associated with "shoes", "sneakers", or "kicks"
      5. of the FILTERED version, MAP below

      */
    if (blogName !== 'crispculture') {
        return true;
    }
    else {
        var target_keywords = ["sneakers", "shoes", "kicks"];


        //looping through the tags prop of each post
        for (var j = 0; j < el.tags.length; j++) {
            //looping through each of the target_keywords array
            for (var i = 0; i < target_keywords.length; i++) {
                if (el.tags[j].toLowerCase().indexOf(target_keywords[i]) > -1) {
                    //console.log("KEEP", el.tags[j])
                    return true;
                }
            }
        }
    }
}

function unique(arr1, arr2) {
    var uniqueArr = [];
    var uniqueIds = [];

    var ids1 = arr1.map(item => item.source_id);
    var ids2 = arr2.map(item => +item.source_id);

    ids1.forEach(function(item) {
        if (ids2.indexOf(item) === -1) {
            uniqueIds.push(item);
        }
    });


    arr1.forEach(function(eachObject) {
        uniqueIds.forEach(function(eachID) {
            if (eachObject.source_id === eachID) {
                uniqueArr.push(eachObject)
            }
        });
    });

    return uniqueArr;
}



//===============================================================================
module.exports = function TumblrAPI(conn) {
    return {
        getPhotosFromBlog: function(callbackFunction) { //if getAllPhotos function works, add first parameter 'blogName'
            var blog = new tumblr.Blog(`sweetsoles.tumblr.com`, oauth);

            /*
            LOGIC
            1. Just map most recent 25 posts of crispculture blog to Allen's MEDIA table
            2. Filter out only the posts that have keywords of "sneakers", "shoes", "kicks" and map to MEDIA table
            3. Write out code to insert data in Allen's MySQL MEDIA table
            4. Write code to check if source_id exists in MEDIA table, only INSERT posts where source_id d.n.e. into MEDIA table
            */

            //50 is the limit of posts I can obtain with the blog API call in line 61
            //CALLBACK FUNCTION
            blog.photo({
                limit: 50
            }, function(error, response) {
                if (error) {
                    callbackFunction(error);
                }
                else {
                    try {
                        //declare variables
                        var date_created, media_url, thumbnail_url, text, keyword, norm_description, source_id, source_url, source_user, crawled_retail_shops, crawled_shops_links;

                        var ccPhotos = []; //THIS IS WHERE ALL THE TABLE INFORMATION FOR EACH PHOTO FROM crispCulture blog will be pushed into

                        //MAPPING AND FILTERING RESPONSE INTO ccPhotos
                        ccPhotos = response.posts
                            .filter(shoePostsOnly.bind(this, 'sweetsoles'))
                            .map(function(eachPost) {
                                var thumbnail, media;

                                eachPost.photos[0].alt_sizes.forEach(function(photo) {
                                    if (photo.width === 400) {
                                        thumbnail = photo.url;
                                    }
                                });

                                eachPost.photos[0].alt_sizes.forEach(function(photo) {
                                    if (photo.width >= 500 && photo.width <= 600) {
                                        //console.log("photo.width: ", photo.width);
                                        media = photo.url;
                                    }
                                });
                                //NOTE that not ALL posts have a link_url!!
                                return {
                                    source_id: eachPost.id,
                                    source_url: `https://${eachPost.blog_name}.tumblr.com`,
                                    source_user: eachPost.blog_name,
                                    date_created: eachPost.date,
                                    text: eachPost.summary,
                                    keyword: eachPost.tags.join(", "),
                                    shop_url: eachPost.link_url,
                                    media_url: media,
                                    thumbnail_url: thumbnail,
                                    crawled_shops_links: (eachPost.link_url ? true : false)
                                };
                            });

                        callbackFunction(null, ccPhotos);
                    }
                    catch (error) {
                        callbackFunction(error);
                    }
                }
            });
        },
        getAllPhotos: function(){ //=========THIS DOES NOT WORK!!!!============
            // var blogs = ['crispculture', 'sweetsoles'];
            // var totalPhotos = [];
            
            // var that = this;
            // blogs.forEach(function(eachBlog){
            //     that.getPhotosFromBlog(eachBlog, function(error, photoResponse){
            //         if(error){
            //             throw error;
            //         }
                    
            //         photoResponse.forEach(function(eachObject){
            //             totalPhotos.push(eachObject);
            //         });
            //     });
            // });
            
            // //this is outside of the async part, so the callbacks haven't returned yet, but this runs first in call stack. Does not work!!
            // console.log("# of photos: ", totalPhotos.length);
            // return totalPhotos;
        },
        insertPhotos: function(callbackFunction) {
            var that = this;
            this.getPhotosFromBlog(function(error, ccPhotos) {
                    if (error) {
                        callbackFunction(error);
                    }
                    else {
                        try {
                            // var photo = ccPhotos[6];
                            // console.log("photo BEFORE insert: ", photo);

                            conn.connect();

                            //===========MySQL - INSERT INTO TABLE=======================

                            that.getAllMedia(function(error, mediaResponse) {
                                    if (error) {
                                        throw error;
                                    }

                                    var newPhotos = unique(ccPhotos, mediaResponse);
                                    console.log("# of new posts to be INSERTED: ", newPhotos.length);


                                    newPhotos.forEach(function(photo) {
                                            conn.query('INSERT INTO media (date_created, media_url, thumbnail_url, text, keyword, source_url, source_user, source_id, shop_url, crawled_shops_links) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [photo.date_created, photo.media_url, photo.thumbnail_url, photo.text, photo.keyword, photo.source_url, photo.source_user, photo.source_id, photo.shop_url, photo.crawled_shops_links],
                                                function(error, newMedia, fields) {
                                                    if (error) {
                                                        throw error;
                                                    }

                                                    conn.query('SELECT * FROM media WHERE id = ?', [newMedia.insertId], function(error, postTable) {
                                                        if (error) {
                                                            throw error;
                                                        }

                                                        //console.log(postTable[0]);

                                                        callbackFunction(null, postTable[0]);
                                                    });
                                                }); //closing bracket for SQL INSERT
                                        }) //closing brackets newPhotos.forEach
                                }) //closing brackets of this.getAllMedia

                        } //closing bracket of try
                        catch (error) {
                            callbackFunction(error);
                        }
                    } //closing bracket of ELSE of this.getPhotos
                }) //closing bracket of this.getPhotos
        }, //closing bracket for getShoePhotos function
        getAllMedia: function(callbackFunction) {

            //conn.connect();

            conn.query('SELECT * FROM media', function(error, mediaTable) {
                if (error) {
                    callbackFunction(error);
                }
                else {
                    try {
                        callbackFunction(null, mediaTable);
                    }
                    catch (error) {
                        callbackFunction(error);
                    }
                }

            });
        }

    }
}
