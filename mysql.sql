-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: railway_reservation
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coaches`
--

DROP TABLE IF EXISTS `coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coaches` (
  `coach_no` int NOT NULL,
  `train_no` int DEFAULT NULL,
  `coach_type` varchar(20) DEFAULT NULL,
  `total_seats` int DEFAULT NULL,
  PRIMARY KEY (`coach_no`),
  KEY `train_no` (`train_no`),
  CONSTRAINT `coaches_ibfk_1` FOREIGN KEY (`train_no`) REFERENCES `trains` (`train_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coaches`
--

LOCK TABLES `coaches` WRITE;
/*!40000 ALTER TABLE `coaches` DISABLE KEYS */;
INSERT INTO `coaches` VALUES (1,101,'Sleeper',100),(2,101,'Second AC',50),(3,101,'Third AC',75),(4,102,'Sleeper',150),(5,102,'First AC',20),(6,103,'Second AC',60),(7,103,'Sleeper',120),(8,104,'Third AC',80),(9,104,'Sleeper',180),(10,105,'First AC',25);
/*!40000 ALTER TABLE `coaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passengers`
--

DROP TABLE IF EXISTS `passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengers` (
  `passenger_id` int NOT NULL AUTO_INCREMENT,
  `passenger_name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`passenger_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengers`
--

LOCK TABLES `passengers` WRITE;
/*!40000 ALTER TABLE `passengers` DISABLE KEYS */;
INSERT INTO `passengers` VALUES (1,'Aarav',28,'Male','9876543210'),(2,'Priya',32,'Female','9123456789'),(3,'Rahul',40,'Male','9988776655'),(4,'Ananya',25,'Female','9876123456'),(5,'Vikram',35,'Male','9912345678'),(6,'Isha',29,'Female','9801234567'),(7,'Ravi',38,'Male','9956781234'),(8,'Sanya',23,'Female','9876545678'),(9,'Arjun',30,'Male','9944556677'),(10,'Neha',27,'Female','9712345678');
/*!40000 ALTER TABLE `passengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `pnr_no` int NOT NULL AUTO_INCREMENT,
  `train_no` int DEFAULT NULL,
  `coach_no` int DEFAULT NULL,
  `passenger_id` int DEFAULT NULL,
  `seat_no` int DEFAULT NULL,
  `fare` decimal(10,2) DEFAULT NULL,
  `booking_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`pnr_no`),
  KEY `train_no` (`train_no`),
  KEY `coach_no` (`coach_no`),
  KEY `passenger_id` (`passenger_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`train_no`) REFERENCES `trains` (`train_no`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`coach_no`) REFERENCES `coaches` (`coach_no`),
  CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`passenger_id`) REFERENCES `passengers` (`passenger_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (2,102,4,2,25,1200.00,'Cancelled'),(3,103,7,3,5,800.00,'Booked'),(4,104,8,4,10,1500.00,'Confirmed'),(5,105,2,5,2,1200.00,'Booked'),(6,101,3,6,8,750.00,'Cancelled'),(7,102,5,7,15,1300.00,'Booked'),(8,103,6,8,22,1000.00,'Confirmed'),(9,104,9,9,18,1600.00,'Booked'),(10,105,10,10,30,1100.00,'Cancelled');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trains`
--

DROP TABLE IF EXISTS `trains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trains` (
  `train_no` int NOT NULL,
  `train_name` varchar(50) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `destination` varchar(50) DEFAULT NULL,
  `departure_time` time DEFAULT NULL,
  `arrival_time` time DEFAULT NULL,
  `total_coaches` int DEFAULT NULL,
  PRIMARY KEY (`train_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trains`
--

LOCK TABLES `trains` WRITE;
/*!40000 ALTER TABLE `trains` DISABLE KEYS */;
INSERT INTO `trains` VALUES (101,'Talaguppa express','Talaguppa','Mysore','21:00:00','10:30:00',25),(102,'Rani channamma Express','Hubballi','Bangalore','07:30:00','18:00:00',18),(103,'Golgumbaz express','Mysore','Pandharpur','09:15:00','17:45:00',20),(104,'Vivek Express','Kanyakumari','Dibrugarh','10:00:00','14:30:00',36),(105,'Himsagar Express','Shri Mata Vaishno Devi Katra','Kanyakumari','11:00:00','21:00:00',17);
/*!40000 ALTER TABLE `trains` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-14 22:13:57
