CREATE TABLE `retail_shops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_created` DATETIME NOT NULL,
  `date_updated` DATETIME NOT NULL,
  `supplier_name` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `province` varchar(200) DEFAULT NULL,
  `postcode` varchar(200) DEFAULT NULL,
  `tel` varchar(200) DEFAULT NULL,
  `geo_loc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
--geo_location coordinates

INSERT INTO retail_shops (date_created, supplier_name, address, city, province, postcode, tel) VALUES
(now(), 'New Balance Montreal', '654 Rue Sainte-Catherine O', 'Montreal', 'QC', 'H3B 1B8', '514-844-2777'),
(now(), 'Vans', '1334 Rue Sainte-Catherine O', 'Montreal', 'QC', 'H3G 2B2', '514-871-2626'),
(now(), 'Sam Tabak', '915 Rue Notre Dame', 'Lachine', 'QC', 'H8S 2C1', '514-637-9654'),
(now(), 'Sport Style Urbain', '7036 Rue St-Hubert', 'Montreal', 'QC', 'H2S 2M9', '514-270-4021'),
(now(), "Schreter's Clothing and Footwear", '4358 Boulevard Saint-Laurent', 'Montreal', 'QC', 'H2W 1Z5', '514-845-4321'),
(now(), 'Exclucity', '1326 Notre-Dame Ouest', 'Montreal', 'QC', 'H3C 1K7', '514-846-8887'),
(now(), 'Exclucity', '9415 Boulevard Leduc Suite 35', 'Brossard', 'QC', 'J4Y 0A5', '450-443-8887'),
(now(), 'Exclucity', '790 Boulevard Le Corbusier', 'Laval', 'QC', 'H7N 0A8', '450-681-8777'),
(now(), 'Exclucity', '4870 Rene-Emard', 'Pierrefonds', 'QC', 'H9A 2Y1', '514-626-4434'),
(now(), 'Off The Hook', '1021 Rue Sainte-Catherine O', 'Montreal', 'QC', 'H3B 1H1', '514-499-1021'),
(now(), 'Boutique Fake', '72 Rue Rachel E', 'Montreal', 'QC', 'H2W 1C6', '514-750-3253'),
(now(), 'Foot Locker', '4201 Rue Saint-Denis', 'Montreal', 'QC', 'H2J 2K9', '514-288-0427'),
(now(), 'Foot Locker', '900 Rue Sainte-Catherine O', 'Montreal', 'QC', 'H3B 1E2', '514-866-7069'),
(now(), 'Foot Locker', '1183 Rue Sainte-Catherine O', 'Montreal', 'QC', 'H3B 1K5', '514-840-1371'),
(now(), 'Adidas Originals Montreal', '1238 Rue Sainte-Catherine O', 'Montreal', 'QC', 'H3G 1P1', '514-315-9546'),
(now(), 'Reebok', '1204 Rue Sainte-Catherine O', 'Montreal', 'QC', 'H3B 1K1', '514-876-4143'),
(now(), 'La Mode Kar Nam', '6550 Rue St-Hubert', 'Montreal', 'QC', 'H2S 2M3', '514-273-4855');

--Feb 21 2017 - for some reason, mysql not allowing me to TRUNCATE retail_shops, and re-add above in with a date timestamp
--so now all table has stores, but no dates to when they were created. Will leave for now.

UPDATE retail_shops SET geo_loc='45 -73' where id =1;
SELECT id, geo_loc FROM retail_shops;