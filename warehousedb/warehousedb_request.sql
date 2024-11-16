-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: warehousedb
-- ------------------------------------------------------
-- Server version	8.0.40

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

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `personnel_id` int NOT NULL,
  `date_requested` date NOT NULL,
  `item_code` varchar(20) NOT NULL,
  `qty_balance` int NOT NULL,
  `qty_total` int NOT NULL,
  `unit` varchar(10) NOT NULL,
  `warehouse_from_id` int NOT NULL,
  `warehouse_to_id` int NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `personnel_id` (`personnel_id`),
  KEY `item_code` (`item_code`),
  KEY `warehouse_from_id` (`warehouse_from_id`),
  KEY `warehouse_to_id` (`warehouse_to_id`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`personnel_id`),
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`item_code`) REFERENCES `item_masterlist` (`item_code`),
  CONSTRAINT `request_ibfk_3` FOREIGN KEY (`warehouse_from_id`) REFERENCES `warehouse` (`warehouse_id`),
  CONSTRAINT `request_ibfk_4` FOREIGN KEY (`warehouse_to_id`) REFERENCES `warehouse` (`warehouse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,1,'2024-11-01','0001370000SILV036Y',100,100,'ROLL',1,2),(2,2,'2024-11-02','0001390007GOLD036Y',200,200,'ROLL',2,3),(3,3,'2024-11-03','003200MEDMRBLU072Y',150,150,'ROLL',3,4),(4,4,'2024-11-04','0001010000YGGO036Y',120,120,'ROLL',4,5),(5,5,'2024-11-05','003200MEDMLBLU072Y',180,180,'ROLL',5,6),(6,6,'2024-11-06','003200MEDMYGLD072Y',210,210,'ROLL',6,7),(7,7,'2024-11-07','003200MEDMWHTE072Y',130,130,'ROLL',7,8),(8,8,'2024-11-08','003200BIG0LBLU036Y',160,160,'ROLL',8,9),(9,9,'2024-11-09','003200BIG0RBLU036Y',140,140,'ROLL',9,10),(10,10,'2024-11-10','003200BIG0WHTE036Y',170,170,'ROLL',10,1),(11,1,'2024-11-11','000701004IYGLD036Y',110,110,'ROLL',1,2),(12,2,'2024-11-12','000701004IRED0036Y',90,90,'ROLL',2,3),(13,3,'2024-11-13','000701004IEGRN036Y',160,160,'ROLL',3,4),(14,4,'2024-11-14','000701004IWHTE036Y',140,140,'ROLL',4,5),(15,5,'2024-11-15','0007010050RBLU036Y',100,100,'ROLL',5,6),(16,6,'2024-11-16','0007010050RED0036Y',150,150,'ROLL',6,7),(17,7,'2024-11-17','0007010050YGLD036Y',180,180,'ROLL',7,8),(18,8,'2024-11-18','003001SMALAGRN036Y',140,140,'ROLL',8,9),(19,9,'2024-11-19','003001SMALBGRN036Y',200,200,'ROLL',9,10),(20,10,'2024-11-20','003001SMALBLCK036Y',120,120,'ROLL',10,1);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-17  0:31:51
