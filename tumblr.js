var tumblr = require('tumblr');

var oauth = {
  consumer_key: 'Upd2NJ7flRc8IHUWMBJNtmgsBYcTOrJHAZtTPhfKegJ0x3XoQc',
  consumer_secret: '9BuBMdxRH31kFA82m71KZpGpSQ8rVcEkxBwYkCXRDdxuh7sDl4',
  token: 'yQ5yVMTf7tNt2eSe5dNy63zKFAiLH3imYRnUCVpYNTUVAfJOhe',
  token_secret: 'kIjc8deyy9udpENwlWdanKk5IAtaR4P37FVQf4my07P8R7QN8L'
};
 
var blog = new tumblr.Blog('crispculture.tumblr.com', oauth);
 
blog.photo({limit: 25}, function(error, response) {
  if (error) {
    throw new Error(error);
  }
 


  //declare variables
  var date_created, media_url, thumbnail_url, text, keyword, norm_description, source_id, source_url, source_user, crawled_retail_shops, crawled_shops_links;

  var ccPhotos = []; //THIS IS WHERE ALL THE TABLE INFORMATION FOR EACH PHOTO FROM crispCulture blog will be pushed into

  ccPhotos = response.posts.map(function(eachPost){
    var thumbnail;

    eachPost.photos[0].alt_sizes.forEach(function(photo){
          if(photo.width === 400){
            thumbnail = photo.url;
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
      media_url: eachPost.photos[0].original_size.url,
      thumbnail_url: thumbnail
    };
  });

  console.log(ccPhotos[ccPhotos.length-1]);
  console.log("number of photos: ", ccPhotos.length);


});


//how to return photos that only have width=== 400 && height ===400? 
