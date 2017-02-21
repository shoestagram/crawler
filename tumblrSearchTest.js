//Mathieu's code

var posts = [ { source_id: 157499666917,
    source_url: 'https://crispculture.tumblr.com',
    source_user: 'crispculture',
    date_created: '2017-02-20 21:48:33 GMT',
    text: 'Supreme Faux Fur Bomber Jacket',
    keyword:
     [ 'supreme',
       'faux fur',
       'bomber jacket',
       'jacket',
       'style',
       'fashion',
       'menswear',
       'streetwear',
       'skate',
       'supreme nyc',
       'supreme new york' ],
    shop_url: 'http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=9&pub=5575056982&toolid=10001&campid=5337384520&customid=&icep_uq=supreme&icep_sellerId=&icep_ex_kw=&icep_sortBy=12&icep_catId=&icep_minPrice=&icep_maxPrice=&ipn=psmain&icep_vectorid=229466&kwid=902099&mtid=824&kw=lg',
    media_url: 'http://68.media.tumblr.com/7b9a91514ce327010d83bbe8a7aeca54/tumblr_olet24T94f1rxme2wo1_1280.jpg',
    thumbnail_url: 'http://68.media.tumblr.com/7b9a91514ce327010d83bbe8a7aeca54/tumblr_olet24T94f1rxme2wo1_400.jpg' },
  { source_id: 157495760863,
    source_url: 'https://crispculture.tumblr.com',
    source_user: 'crispculture',
    date_created: '2017-02-20 20:06:40 GMT',
    text: 'Supreme Obama Anorak',
    keyword:
     [ 'supreme',
       'obama',
       'anorak',
       'barack obama',
       'supreme new york',
       'supreme nyc',
       'style',
       'fashion',
       'menswear',
       'streetwear',
       'skate' ],
    shop_url: 'http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=9&pub=5575056982&toolid=10001&campid=5337384520&customid=&icep_uq=supreme&icep_sellerId=&icep_ex_kw=&icep_sortBy=12&icep_catId=&icep_minPrice=&icep_maxPrice=&ipn=psmain&icep_vectorid=229466&kwid=902099&mtid=824&kw=lg',
    media_url: 'http://68.media.tumblr.com/9b56b6e7b328293d6283f1896c6c837c/tumblr_olesxjt6Dh1rxme2wo1_1280.jpg',
    thumbnail_url: 'http://68.media.tumblr.com/9b56b6e7b328293d6283f1896c6c837c/tumblr_olesxjt6Dh1rxme2wo1_400.jpg' },
  { source_id: 157492123059,
    source_url: 'https://crispculture.tumblr.com',
    source_user: 'crispculture',
    date_created: '2017-02-20 18:24:21 GMT',
    text: 'Supreme Truth Tour Jacket',
    keyword:
     [ 'supreme',
       'supreme new york',
       'supreme nyc',
       'tour jacket',
       'jacket',
       'style',
       'fashion',
       'menswear',
       'streetwear',
       'design' ],
    shop_url: undefined,
    media_url: 'http://68.media.tumblr.com/0933a3c6f3d57abe8e85ea38f29ce93a/tumblr_olesuqcuKJ1rxme2wo1_1280.jpg',
    thumbnail_url: 'http://68.media.tumblr.com/0933a3c6f3d57abe8e85ea38f29ce93a/tumblr_olesuqcuKJ1rxme2wo1_400.jpg' },
  { source_id: 157489231501,
    source_url: 'https://crispculture.tumblr.com',
    source_user: 'crispculture',
    date_created: '2017-02-20 17:00:42 GMT',
    text: 'JackThreads Warehouse Sale - Last Chance To Take Up To 90% OFF Online at JackThreads.com',
    keyword:
     [ 'jackthreads',
       'jack threads',
       'boots',
       'shoes',
       'wingtip',
       'wingtip shoes',
       'wingtip brogues',
       'wingtip boots',
       'style',
       'fashion',
       'menswear',
       'sale' ],
    shop_url: 'https://www.jackthreads.com/invite/tobytoby7',
    media_url: 'http://68.media.tumblr.com/4eb6af7add2dfd6a4e7a42c6ea5fd594/tumblr_olmz1toyyE1rxme2wo1_1280.png',
    thumbnail_url: 'http://68.media.tumblr.com/4eb6af7add2dfd6a4e7a42c6ea5fd594/tumblr_olmz1toyyE1rxme2wo1_400.png' },
  { source_id: 157488612191,
    source_url: 'https://crispculture.tumblr.com',
    source_user: 'crispculture',
    date_created: '2017-02-20 16:42:24 GMT',
    text: '',
    keyword:
     [ 'bape',
       'a bathing ape',
       'style',
       'fashion',
       'streetwear',
       't-shirts',
       'tees',
       'end.',
       'end clothing' ],
    shop_url: 'http://click.linksynergy.com/fs-bin/click?id=At6WYV2K54I&offerid=427875.6&type=3&subid=0',
    media_url: 'http://68.media.tumblr.com/390d79a67119f239a81373e9fd08b1b7/tumblr_ole7kzY2Ve1rxme2wo1_1280.png',
    thumbnail_url: 'http://68.media.tumblr.com/390d79a67119f239a81373e9fd08b1b7/tumblr_ole7kzY2Ve1rxme2wo1_400.png' } ];


var toFind = ['shoes', 'sneakers', 'kicks'];

var bb = posts.filter(function(el){
 for ( var ii = 0, ll = el.keyword.length; ii < ll; ii++) {
    for ( var i = 0, l = toFind.length; i < l; i++) {
        if (el.keyword[ii].toLowerCase().indexOf(toFind[i]) > -1) {
            console.log("KEEP", el.keyword[ii])
            return true;
        }
    }
  }
})

console.log(bb);