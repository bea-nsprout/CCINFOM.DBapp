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
-- Table structure for table `item_masterlist`
--

DROP TABLE IF EXISTS `item_masterlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_masterlist` (
  `item_code` varchar(20) DEFAULT NULL,
  `item_desc` varchar(150) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_masterlist`
--

LOCK TABLES `item_masterlist` WRITE;
/*!40000 ALTER TABLE `item_masterlist` DISABLE KEYS */;
INSERT INTO `item_masterlist` VALUES ('0001370000SILV036Y','MET. LACE 137-50 SILVER 36 YDS','ROLL'),('0001390007GOLD036Y','MET. LACE RIC RAC 139 #25 1/4\" (7MM) GOLD 36 YDS','ROLL'),('003200MEDMRBLU072Y','WED. CORD 3200 MED. ROYAL BLUE 72 YDS','ROLL'),('0001010000YGGO036Y','MET. LACE 101-14 YGD W GOLD 36 YDS','ROLL'),('003200MEDMLBLU072Y','WED. CORD 3200 MED. LT. BLUE 72 YDS','ROLL'),('003200MEDMYGLD072Y','WED. CORD 3200 MED. Y. GOLD 72 YDS','ROLL'),('003200MEDMWHTE072Y','WED. CORD 3200 MED. WHITE 72 YDS','ROLL'),('003200BIG0LBLU036Y','WED. CORD 3200 BIG LT. BLUE 36 YDS','ROLL'),('003200BIG0RBLU036Y','WED. CORD 3200 BIG ROYAL BLUE 36 YDS','ROLL'),('003200BIG0WHTE036Y','WED. CORD 3200 BIG WHITE 36 YDS','ROLL'),('000701004IYGLD036Y','FRINGES 701 4\" Y. GOLD 36 YDS','ROLL'),('000701004IRED0036Y','FRINGES 701 4\" RED 36 YDS','ROLL'),('000701004IEGRN036Y','FRINGES 701 4\" E. GREEN 36 YDS','ROLL'),('000701004IWHTE036Y','FRINGES 701 4\" WHITE 36 YDS','ROLL'),('0007010050RBLU036Y','FRINGES 701 2\" (50MM) ROYAL BLUE 36 YDS','ROLL'),('0007010050RED0036Y','FRINGES 701 2\" (50MM) RED 36 YDS','ROLL'),('0007010050YGLD036Y','FRINGES 701 2\" (50MM) Y. GOLD 36 YDS','ROLL'),('003001SMALAGRN036Y','JAP. CORD 3001 SMALL A. GREEN 36 YDS','ROLL'),('003001SMALBGRN036Y','JAP. CORD 3001 SMALL BAT. GREEN 36 YDS','ROLL'),('003001SMALBLCK036Y','JAP. CORD 3001 SMALL BLACK 36 YDS','ROLL'),('003001SMALBRWN036Y','JAP. CORD 3001 SMALL BROWN 36 YDS','ROLL'),('003001SMALCYLW036Y','JAP. CORD 3001 SMALL C. YELLOW 36 YDS','ROLL'),('003001SMALLBLU036Y','JAP. CORD 3001 SMALL LT. BLUE 36 YDS','ROLL'),('003001SMALPINK036Y','JAP. CORD 3001 SMALL PINK 36 YDS','ROLL'),('003001SMALPURP036Y','JAP. CORD 3001 SMALL PURPLE 36 YDS','ROLL'),('003001SMALRBLU036Y','JAP. CORD 3001 SMALL ROYAL BLUE 36 YDS','ROLL'),('003001SMALRED0036Y','JAP. CORD 3001 SMALL RED 36 YDS','ROLL'),('003001SMALTANG036Y','JAP. CORD 3001 SMALL TANGERINE 36 YDS','ROLL'),('003001SMALWHTE036Y','JAP. CORD 3001 SMALL WHITE 36 YDS','ROLL'),('003001SMALYGLD036Y','JAP. CORD 3001 SMALL Y. GOLD 36 YDS','ROLL'),('003200MEDMRBLU072Y','WED. CORD 3200 MED. ROYAL BLUE 72 YDS','ROLL'),('0001010000YGGO036Y','MET. LACE 101-14 YGD W GOLD 36 YDS','ROLL'),('003200MEDMLBLU072Y','WED. CORD 3200 MED. LT. BLUE 72 YDS','ROLL'),('003200MEDMYGLD072Y','WED. CORD 3200 MED. Y. GOLD 72 YDS','ROLL'),('003200MEDMWHTE072Y','WED. CORD 3200 MED. WHITE 72 YDS','ROLL'),('003200BIG0LBLU036Y','WED. CORD 3200 BIG LT. BLUE 36 YDS','ROLL'),('003200BIG0RBLU036Y','WED. CORD 3200 BIG ROYAL BLUE 36 YDS','ROLL'),('003200BIG0WHTE036Y','WED. CORD 3200 BIG WHITE 36 YDS','ROLL'),('000701004IYGLD036Y','FRINGES 701 4\" Y. GOLD 36 YDS','ROLL'),('000701004IRED0036Y','FRINGES 701 4\" RED 36 YDS','ROLL'),('000701004IEGRN036Y','FRINGES 701 4\" E. GREEN 36 YDS','ROLL'),('000701004IWHTE036Y','FRINGES 701 4\" WHITE 36 YDS','ROLL'),('0007010050RBLU036Y','FRINGES 701 2\" (50MM) ROYAL BLUE 36 YDS','ROLL'),('0007010050RED0036Y','FRINGES 701 2\" (50MM) RED 36 YDS','ROLL'),('0007010050YGLD036Y','FRINGES 701 2\" (50MM) Y. GOLD 36 YDS','ROLL'),('0001390004GOLD036Y','MET. LACE RIC RAC 139 #17 4MM GOLD 36 YDS','ROLL'),('0001390007GOLD036Y','MET. LACE RIC RAC 139 #25 1/4\" (7MM) GOLD 36 YDS','ROLL'),('0001380000GOLD036Y','MET. LACE 138-25 GOLD 36 YDS','ROLL'),('0001370000GOLD036Y','MET. LACE 137-50 GOLD 36 YDS','ROLL'),('0008120022REGO050Y','ORGANZA SATIN W/ MET. 812 7/8\" (22MM) RED W GOLD 50 YDS','ROLL'),('0008120022WHGO050Y','ORGANZA SATIN W/ MET. 812 7/8\" (22MM) WHT W GOLD 50 YDS','ROLL'),('0008120022PEGO050Y','ORGANZA SATIN W/ MET. 812 7/8\" (22MM) PCH W GOLD 50 YDS','ROLL'),('0008120022EGGO050Y','ORGANZA SATIN W/ MET. 812 7/8\" (22MM) EGN W GOLD 50 YDS','ROLL'),('0008120022RBGO050Y','ORGANZA SATIN W/ MET. 812 7/8\" (22MM) RBL W GOLD 50 YDS','ROLL'),('0008120022YGGO050Y','ORGANZA SATIN W/ MET. 812 7/8\" (22MM) YGD W GOLD 50 YDS','ROLL'),('0008100007PURP050Y','DE SATIN RIBBON 810 1/4\" (7MM) PURPLE 50 YDS','ROLL'),('0008100007PINK050Y','DE SATIN RIBBON 810 1/4\" (7MM) PINK 50 YDS','ROLL'),('0008100007RBLU050Y','DE SATIN RIBBON 810 1/4\" (7MM) ROYAL BLUE 50 YDS','ROLL'),('0008100007LBLU050Y','DE SATIN RIBBON 810 1/4\" (7MM) LT. BLUE 50 YDS','ROLL'),('0008100007AGRN050Y','DE SATIN RIBBON 810 1/4\" (7MM) A. GREEN 50 YDS','ROLL'),('0008100007EGRN050Y','DE SATIN RIBBON 810 1/4\" (7MM) E. GREEN 50 YDS','ROLL'),('0008100007YGLD050Y','DE SATIN RIBBON 810 1/4\" (7MM) Y. GOLD 50 YDS','ROLL'),('0008110007YGGO050Y','DE SATIN RIBBON W/MET. 811 1/4\" (7MM) YGD W GOLD 50 YDS','ROLL'),('0008110007WHGO050Y','DE SATIN RIBBON W/MET. 811 1/4\" (7MM) WHT W GOLD 50 YDS','ROLL'),('0008110007EGGO050Y','DE SATIN RIBBON W/MET. 811 1/4\" (7MM) EGN W GOLD 50 YDS','ROLL'),('0008110007PIGO050Y','DE SATIN RIBBON W/MET. 811 1/4\" (7MM) PNK W GOLD 50 YDS','ROLL'),('0008130070RBLU050Y','CUT EDGE RIBBON 813 #40 70MM ROYAL BLUE 50 YDS','ROLL'),('0008130070PINK050Y','CUT EDGE RIBBON 813 #40 70MM PINK 50 YDS','ROLL'),('0008130070CYLW050Y','CUT EDGE RIBBON 813 #40 70MM C. YELLOW 50 YDS','ROLL'),('0008130070PECH050Y','CUT EDGE RIBBON 813 #40 70MM PEACH 50 YDS','ROLL'),('0008130070LBLU050Y','CUT EDGE RIBBON 813 #40 70MM LT. BLUE 50 YDS','ROLL'),('0008130070AGRN050Y','CUT EDGE RIBBON 813 #40 70MM A. GREEN 50 YDS','ROLL'),('0008130070TANG050Y','CUT EDGE RIBBON 813 #40 70MM TANGERINE 50 YDS','ROLL'),('0008130036TANG050Y','CUT EDGE RIBBON 813 #9 36MM TANGERINE 50 YDS','ROLL'),('0008130036AGRN050Y','CUT EDGE RIBBON 813 #9 36MM A. GREEN 50 YDS','ROLL'),('0008130036MGLD050Y','CUT EDGE RIBBON 813 #9 36MM MATTE GOLD 50 YDS','ROLL'),('0008130036LBLU050Y','CUT EDGE RIBBON 813 #9 36MM LT. BLUE 50 YDS','ROLL');
/*!40000 ALTER TABLE `item_masterlist` ENABLE KEYS */;
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
