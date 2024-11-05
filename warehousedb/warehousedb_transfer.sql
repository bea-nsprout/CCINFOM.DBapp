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
  `transfer_id` int DEFAULT NULL,
  `request_id` int DEFAULT NULL,
  `personnel_id` int DEFAULT NULL,
  `item_code` varchar(20) DEFAULT NULL,
  `date_transferred` date DEFAULT NULL,
  `truck_id` varchar(10) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` VALUES (1,1,1,'0001370000SILV036Y','2021-10-06','TRK001',50,'ROLL'),(2,2,2,'0001390007GOLD036Y','2021-11-22','TRK002',100,'ROLL'),(3,3,3,'003200MEDMRBLU072Y','2021-12-26','TRK003',75,'ROLL'),(4,4,4,'0001010000YGGO036Y','2022-01-20','TRK004',60,'ROLL'),(5,5,5,'003200MEDMLBLU072Y','2022-02-15','TRK005',80,'ROLL'),(6,6,6,'003200MEDMYGLD072Y','2022-03-20','TRK006',100,'ROLL'),(7,7,7,'003200MEDMWHTE072Y','2022-04-25','TRK007',70,'ROLL'),(8,8,8,'003200BIG0LBLU036Y','2022-05-30','TRK008',90,'ROLL'),(9,9,9,'003200BIG0RBLU036Y','2022-06-15','TRK009',80,'ROLL'),(10,10,10,'003200BIG0WHTE036Y','2022-07-20','TRK010',95,'ROLL'),(11,1,1,'000701004IYGLD036Y','2022-08-05','TRK011',55,'ROLL'),(12,2,2,'000701004IRED0036Y','2022-09-15','TRK012',65,'ROLL'),(13,3,3,'000701004IEGRN036Y','2022-10-10','TRK013',70,'ROLL'),(14,4,4,'000701004IWHTE036Y','2022-11-15','TRK014',80,'ROLL'),(15,5,5,'0007010050RBLU036Y','2023-01-05','TRK015',85,'ROLL');
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

-- Dump completed on 2024-11-05 23:13:13
