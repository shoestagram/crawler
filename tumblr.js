var tumblr = require('tumblr');

var oauth = {
    consumer_key: 'Upd2NJ7flRc8IHUWMBJNtmgsBYcTOrJHAZtTPhfKegJ0x3XoQc',
    consumer_secret: '9BuBMdxRH31kFA82m71KZpGpSQ8rVcEkxBwYkCXRDdxuh7sDl4',
    token: 'yQ5yVMTf7tNt2eSe5dNy63zKFAiLH3imYRnUCVpYNTUVAfJOhe',
    token_secret: 'kIjc8deyy9udpENwlWdanKk5IAtaR4P37FVQf4my07P8R7QN8L'
};


//=============RE-USABLE FUNCTIONS=============================================
function getShoePosts(el) {
  /*
    LOGIC 
    1. First filter through posts and keep only posts that have tags associated with "shoes", "sneakers", or "kicks"
    5. of the FILTERED version, MAP below

    */
  var target_keywords = ["sneakers", "shoes", "kicks"];


    // //trying to do it with forEach versus for loops -- not working
    // var test = response.posts.filter(function(eachPost) {
    //     //if in the posts tags' property, you find the target_keywords, then return true
    //     eachPost.tags.forEach(function(eachTag) {

    //       target_keywords.forEach(function(eachTarget){
    //         if(eachTag.toLowerCase().indexOf(eachTarget) > -1 ){
    //           return true;
    //         }
    //       });

    //         // if (target_keywords.indexOf(eachTag) !== -1) {
    //         //     console.log("KEEP", eachTag);
    //         //     return true;
    //         // }
    //     });

    // })


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



//===============================================================================
var blog = new tumblr.Blog('crispculture.tumblr.com', oauth);

/*
LOGIC
1. Just map most recent 25 posts of crispculture blog to Allen's MEDIA table
2. Filter out only the posts that have keywords of "sneakers", "shoes", "kicks" and map to MEDIA table
3. Write out code to insert data in Allen's MySQL MEDIA table
4. Write code to check if source_id exists in MEDIA table, only INSERT posts where source_id d.n.e. into MEDIA table
*/

//50 is the limit of posts I can obtain with the blog API call in line 61
blog.photo({ limit: 50 }, function(error, response) {
    if (error) {
        throw new Error(error);
    }



    //declare variables
    var date_created, media_url, thumbnail_url, text, keyword, norm_description, source_id, source_url, source_user, crawled_retail_shops, crawled_shops_links;

    var ccPhotos = []; //THIS IS WHERE ALL THE TABLE INFORMATION FOR EACH PHOTO FROM crispCulture blog will be pushed into

    ccPhotos = response.posts
        .filter(getShoePosts)
        .map(function(eachPost) {
            var thumbnail, media;

            eachPost.photos[0].alt_sizes.forEach(function(photo) {
              if (photo.width === 400) {
                  thumbnail = photo.url;
              }
            });

            eachPost.photos[0].alt_sizes.forEach(function(photo){
              if(photo.width >= 500 && photo.width <= 600){
                //console.log("photo.width: ", photo.width);
                media = photo.url;
              }
            });

            return {
                source_id: eachPost.id,
                source_url: `https://${eachPost.blog_name}.tumblr.com`,
                source_user: eachPost.blog_name,
                date_created: eachPost.date,
                text: eachPost.summary,
                keyword: eachPost.tags,
                shop_url: eachPost.link_url,
                media_url: media,
                thumbnail_url: thumbnail
            };
        });

    //console.log(ccPhotos[ccPhotos.length - 1]);
    console.log("number of photos: ", ccPhotos.length);


});


//how to return photos that only have width=== 400 && height ===400?
