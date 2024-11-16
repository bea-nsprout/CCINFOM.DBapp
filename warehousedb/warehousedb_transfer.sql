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
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer` (
  `transfer_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `personnel_id` int NOT NULL,
  `item_code` varchar(20) NOT NULL,
  `date_transferred` date NOT NULL,
  `truck_id` varchar(10) NOT NULL,
  `quantity` int NOT NULL,
  `unit` varchar(10) NOT NULL,
  `warehouse_from_id` int NOT NULL,
  `warehouse_to_id` int NOT NULL,
  PRIMARY KEY (`transfer_id`),
  KEY `request_id` (`request_id`),
  KEY `personnel_id` (`personnel_id`),
  KEY `item_code` (`item_code`),
  KEY `truck_id` (`truck_id`),
  KEY `warehouse_from_id` (`warehouse_from_id`),
  KEY `warehouse_to_id` (`warehouse_to_id`),
  CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `request` (`request_id`),
  CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`personnel_id`),
  CONSTRAINT `transfer_ibfk_3` FOREIGN KEY (`item_code`) REFERENCES `item_masterlist` (`item_code`),
  CONSTRAINT `transfer_ibfk_4` FOREIGN KEY (`truck_id`) REFERENCES `truck` (`truck_id`),
  CONSTRAINT `transfer_ibfk_5` FOREIGN KEY (`warehouse_from_id`) REFERENCES `warehouse` (`warehouse_id`),
  CONSTRAINT `transfer_ibfk_6` FOREIGN KEY (`warehouse_to_id`) REFERENCES `warehouse` (`warehouse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` VALUES (1,1,1,'0001370000SILV036Y','2024-11-01','TRK001',50,'ROLL',1,2),(2,2,2,'0001390007GOLD036Y','2024-11-02','TRK002',100,'ROLL',2,3),(3,3,3,'003200MEDMRBLU072Y','2024-11-03','TRK003',75,'ROLL',3,4),(4,4,4,'0001010000YGGO036Y','2024-11-04','TRK004',60,'ROLL',4,5),(5,5,5,'003200MEDMLBLU072Y','2024-11-05','TRK005',90,'ROLL',5,6),(6,6,6,'003200MEDMYGLD072Y','2024-11-06','TRK006',105,'ROLL',6,7),(7,7,7,'003200MEDMWHTE072Y','2024-11-07','TRK007',65,'ROLL',7,8),(8,8,8,'003200BIG0LBLU036Y','2024-11-08','TRK008',80,'ROLL',8,9),(9,9,9,'003200BIG0RBLU036Y','2024-11-09','TRK009',70,'ROLL',9,10),(10,10,10,'003200BIG0WHTE036Y','2024-11-10','TRK010',85,'ROLL',10,1),(11,11,1,'000701004IYGLD036Y','2024-11-11','TRK001',50,'ROLL',1,2),(12,12,2,'000701004IRED0036Y','2024-11-12','TRK002',45,'ROLL',2,3),(13,13,3,'000701004IEGRN036Y','2024-11-13','TRK003',80,'ROLL',3,4),(14,14,4,'000701004IWHTE036Y','2024-11-14','TRK004',70,'ROLL',4,5),(15,15,5,'0007010050RBLU036Y','2024-11-15','TRK005',50,'ROLL',5,6),(16,16,6,'0007010050RED0036Y','2024-11-16','TRK006',75,'ROLL',6,7),(17,17,7,'0007010050YGLD036Y','2024-11-17','TRK007',90,'ROLL',7,8),(18,18,8,'003001SMALAGRN036Y','2024-11-18','TRK008',70,'ROLL',8,9),(19,19,9,'003001SMALBGRN036Y','2024-11-19','TRK009',100,'ROLL',9,10),(20,20,10,'003001SMALBLCK036Y','2024-11-20','TRK010',60,'ROLL',10,1);
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;
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
