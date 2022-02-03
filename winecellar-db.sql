DROP TABLE IF EXISTS `Wines`;
DROP TABLE IF EXISTS `Dishes`;
DROP TABLE IF EXISTS `WinePairings`;

CREATE TABLE `Wines` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `vintage` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `quantity` INT NOT NULL
);

CREATE TABLE `Dishes` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `dishName` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL
);

CREATE TABLE `WinePairings` (
    `WineId` INT NULL,
    `DisheId` INT NULL,
    FOREIGN KEY (WineId) REFERENCES Wines(id) ON DELETE CASCADE,
    FOREIGN KEY (DisheId) REFERENCES Dishes(id) ON DELETE CASCADE
);

INSERT INTO `Wines` (`name`, `vintage`, `image`,`type`,`quantity`) VALUES ('Medoc','1999', 'myImg','red',0),('Chassagne-Montrachet','2015', 'myImg2','white',1),('Sauterne','1967', 'myImg3','sweet',2),('Savoie','2019', 'myImg4','red',3),('Collioure','2016', 'myImg5','white',6),('Chassagne-Montrachet','2015', 'myImg6','white',9),('rivesalte ambré','1967', 'myImg7','sweet',9),('Banyuls','1967', 'myImg8','sweet',7),('brachetto d acqui','2019', 'myImg9','sweet',0),('Jura','2000', 'myImg5','white',5);
INSERT INTO `Dishes` (`dishName`, `type`) VALUES ('lobster','starter'),('foie gras','starter'),('johndory','maincourse'),('beef','maincourse'),('Blue Cheese','cheesecourse'),('Comté Cheese','cheesecourse'),('foret noire','desert'),('charlotte aux fraises','desert'),('Poularde de Bresse','maincourse');
INSERT INTO `WinePairings` (`WineId`, `DisheId`) VALUES (1,4),(2,3),(3,5),(10,6),(3,3),(4,3),(4,9),(5,3),(6,3),(6,6),(7,8),(8,8),(9,8),(10,3),(8,7),(3,2);