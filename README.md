# Shoestagram Crawler
The crawler is split up into 3 components:
1. Tumblr
2. Ebay
3. Store Locator


## Tumblr 
Using the nodeJS tumblr wrapper, it makes a callback to tumblr's API to a specific blog, and pulls the photo posts from that blog. It filters out the posts that don't include "sneakers", "shoes", or "kicks" in their tags, and inserts them into our MySQL database (i.e. Media table). By running demo-using-api.js, our internal API checks for duplicates, and only inserts the new photos to the database.
###### Files used: ######
- tumblah.js
- demo-using-api.js

## Ebay
(to be updated)

## Amazon
Using the Amazon Product Advertising API, and the nodeJS wrapper for it (https://github.com/dmcquay/node-apac), a query is first called to our MySQL database to get all the media items in the Media Table. Then looping through each item, a "fetch" was done to retrieve an amazon URL link, price, and description of that item. Once found, it is then inserted into shop_links table. 
###### Files used: ######
- amazon2.js

## Store Locator
Not many sneaker stores in Montreal, so the stores were found just through google maps search. Then their coordinates were found by pulling the address, city, and province from the Media table, then putting that into a request to the Google Maps Geocoding API to get each store's latitude and longitudes. Once found, values were then updated as 1 string in the Retail_shops table.
###### Files used: ######
- shops-crawler.js

## Other Crawler
Photos/media that were crawled from the crispculture.tumblr.com blog has some shopping links associated to it that actually leads to a direct URL to buy that shoe. This crawler combs through the media table and searches for shop_url's that have the "fave" domain name, then inserts these into the shop_links table along with its associated media_id.
###### Files used: ######
- other-crawler.js