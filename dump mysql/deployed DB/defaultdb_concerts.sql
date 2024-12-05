-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: mysql-1739261d-capusluc-4858.f.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '7bf8a8f0-b00f-11ef-944d-0e9b853ea24d:1-186';

--
-- Table structure for table `concerts`
--

DROP TABLE IF EXISTS `concerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concerts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `heure` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `lien` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `origine` varchar(255) DEFAULT NULL,
  `scene` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concerts`
--

LOCK TABLES `concerts` WRITE;
/*!40000 ALTER TABLE `concerts` DISABLE KEYS */;
INSERT INTO `concerts` VALUES (1,'16 Juin','Ce projet musical suisse puise son énergie dans les arpèges violents et dissonants du Black Metal et des sons froids de la musique industrielle.','20:00','https://www.verdammnis.com/img/uploads/2024/08/versatile.jpeg','https://www.versatilemetalband.com/','Versatile','Europe','nord'),(3,'15 Juin','NAPALM DEATH est un groupe de metal extrême dont le nom est synonyme de musique lourde poussée à son paroxysme.','21:00','https://www.metalzone.fr/wp-content/uploads/2023/09/NAPALMDEATH_MOTOC23-19-768x512.jpg','https://napalmdeath.org/','Napalm death','Europe','principale'),(4,'16 Juin','Babymetal, stylisé BABYMETAL, est un groupe de J-pop et heavy metal japonais, originaire de Tokyo. Formé en 2010, il est composé de trois jeunes idoles japonaises et produit par l\'agence de talent Amuse, Inc.','18:00','https://www.metalzone.fr/wp-content/uploads/2019/07/Babymetal.jpg','https://babymetal.com/mob/index.php?site=TO&ima=2604','Babymetal','Asie','sud'),(9,'14 juin','Arka\'n Asrafokor, un groupe de métal africain, est reconnu comme un précurseur dans la scène musicale du continent.','18:00','https://www.prime-tours.com/site/assets/files/4779/72152315_3507262379291527_923094037911568384_n.-hero.jpg','https://www.facebook.com/arkanasrafokor/?locale=fr_FR','Arka’n Asrafokor','Afrique','ouest'),(10,'14 juin','De riffs destructeurs en tensions qui éclatent orages de distorsions, Great Falls portent somme toute très bien leur nom.','20:00','https://www.brooklynvegan.com/wp-content/uploads/2023/02/20/attachment-great-falls.jpeg','https://www.facebook.com/GreatFallsNoise/','Great Falls','Amerique','principale'),(13,'15 juin','test 2','21:00','https://i.ebayimg.com/images/g/iF0AAOSw6x9i5MMT/s-l1200.png','','luc','Australie','sud'),(15,'14 Juin','Here is a short description...','20:00','https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg','https://images.pexels.com','The artist 2','Europe','nord');
/*!40000 ALTER TABLE `concerts` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05  9:02:37
