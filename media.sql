show databases;
CREATE DATABASE shoestagram;

USE DATABASE shoestagram;

CREATE TABLE `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `media_url` varchar(200) DEFAULT NULL,
  `thumbnail_url` varchar(200) DEFAULT NULL,
  `text` varchar(200) DEFAULT NULL,
  `keyword` varchar(200) DEFAULT NULL,
  `norm_description` varchar(200) DEFAULT NULL,
  `source_url` varchar(200) DEFAULT NULL,
  `source_user` varchar(200) DEFAULT NULL,
  `source_id` varchar(200) DEFAULT NULL,
  `crawled_retails_shops` boolean DEFAULT NULL,
  `crawled_shops_links` boolean DEFAULT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE media ADD COLUMN 
        shop_url varchar(200) DEFAULT NULL;

DESCRIBE media;

--now I insert my tumblr photos

INSERT INTO media (createdAt, media_url, thumbnail_url, text, keyword, source_url, source_user, source_id, shop_url, crawled_shops_links) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

INSERT INTO media (createdAt, media_url, thumbnail_url, text, keyword, source_url, source_user, source_id, crawled_shops_links) VALUES ('2017-02-21 01:12:14 GMT', 'http://68.media.tumblr.com/23a0b8ad72f86a68ac45a9f0a8539b26/tumblr_olfvemO3rk1rxme2wo5_500.jpg', 'http://68.media.tumblr.com/23a0b8ad72f86a68ac45a9f0a8539b26/tumblr_olfvemO3rk1rxme2wo5_400.jpg', "Sneaker Politics x adidas Originals Gazelle PK ‘Mardi Gras’ | 03.04 | EndClothing.com", "adidas, ultraboost, ultraboost uncaged, sneakersnstuff, sneakers, shoes, kicks, trainers, style, fashion, streetwear, kickgame, shoegame", 'https://crispculture.tumblr.com', 'crispculture', '157507198589', true);

--clears contents in media table
TRUNCATE media;
 
-----------------------------TESTING-------------------------------------------

CREATE TABLE `keywords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keywords` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
 );
 
INSERT INTO keywords (keywords) VALUES ('adidas, ultraboost, ultraboost uncaged, sneakersnstuff, sneakers, shoes, kicks, trainers, style, fashion, streetwear, kickgame, shoegame'),
("raf simons, adidas by raf simons, adidas x raf simons, adidas, ozweego 2, ssense, style, fashion, menswear, sneakers, shoes, kicks, trainers");
--------------------------------------------------------------------------------

