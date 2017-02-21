# Shoestagram Crawler
The crawler is split up into 3 components:
1. Tumblr
2. Ebay
3. Store Locator

## Tumblr
Using the nodeJS tumblr wrapper, it makes a callback to tumblr's API to a specific blog, and pulls the photo posts from that blog. It filters out the posts that don't include "sneakers", "shoes", or "kicks" in their tags, and inserts them into our MySQL database (i.e. Media table). By running demo-using-api.js, our internal API checks for duplicates, and only inserts the new photos to the database.

## Ebay
(to be updated)

## Store Locator
(to be updated)