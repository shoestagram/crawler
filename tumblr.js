var tumblr = require('tumblr');

var oauth = {
  consumer_key: 'Upd2NJ7flRc8IHUWMBJNtmgsBYcTOrJHAZtTPhfKegJ0x3XoQc',
  consumer_secret: '9BuBMdxRH31kFA82m71KZpGpSQ8rVcEkxBwYkCXRDdxuh7sDl4',
  token: 'yQ5yVMTf7tNt2eSe5dNy63zKFAiLH3imYRnUCVpYNTUVAfJOhe',
  token_secret: 'kIjc8deyy9udpENwlWdanKk5IAtaR4P37FVQf4my07P8R7QN8L'
};
 
var blog = new tumblr.Blog('crispculture.tumblr.com', oauth);
 
blog.photo({limit: 2}, function(error, response) {
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
      media_url: eachPost.photos[0].original_size,
      thumbnail_url: thumbnail
    };
  });

  console.log(ccPhotos);
  // console.log(ccPhotos[0].thumbnail_url);
  //console.log(response.posts);
  //MAKING A PHOTO FROM FIRST BLOG POST
  // var date_created = response.posts[0].date;
  // var media_url = response.posts[0].post_url;
  // var text = response.posts[0].summary;
  // var keyword = response.posts[0].tags;
  // var source_id = response.posts[0].id;
  // var source_url = response.posts[0].post_url;
  // var source_user = response.posts[0].blog_name;


  // var shoppingURL = response.posts[0].link_url; //sometimes blog post won't have this

  // if (shoppingURL){
  //   crawled_shops_links === true;
  // }


  // var photos = response.posts[0].photos[0].alt_sizes;
  // //console.log("photos: ", photos);

  // //loop through the photos of first blog, and find the photo with a width ===400
  // photos.forEach(function(photo){
  // 	if(photo.width === 400){
  // 		// width = photo.width;
  // 		// height= photo.height;
  // 		thumbnail_url = photo.url;
  // 	}

  //   //console.log("photo width: ", photo.width, typeof photo.width); //outputs number
  //   //console.log("photo height: ", photo.height, typeof photo.height); //number too
  // });

  // // console.log("width: ", width);
  // // console.log("height: ", height);
  // // console.log("url: ", imageURL);
  // // console.log("shopping URL: ", response.posts[1].link_url);

  // var firstPhoto = {
  // 	dateCreated: dateCreated,
  // 	postURL: postURL,
  // 	text: text,
  // 	keywords: tags,
  // 	imageURL: imageURL,
  // 	imageWidth: width,
  // 	imageHeight: height,
  // 	shoppingURL: shoppingURL
  // }

  // console.log("first photo: ", firstPhoto);


});


//how to return photos that only have width=== 400 && height ===400? 
