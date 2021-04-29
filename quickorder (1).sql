-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 29, 2021 at 06:31 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quickorder`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `ID` int(11) NOT NULL,
  `PlaceID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `IsDelete` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`ID`, `PlaceID`, `CategoryName`, `Description`, `IsActive`, `IsDelete`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Veg', 'description', 1, 0, '2021-04-18 16:50:02', '2021-04-18 16:50:02'),
(2, 2, 'Non-Veg', 'dessert description', 1, 0, '2021-04-18 16:59:07', '2021-04-18 16:59:07');

-- --------------------------------------------------------

--
-- Table structure for table `Food_Order`
--

CREATE TABLE `Food_Order` (
  `ID` int(11) NOT NULL,
  `PlaceID` int(11) NOT NULL,
  `TableNo` int(11) NOT NULL,
  `OrderNo` int(11) NOT NULL,
  `TotalAmount` varchar(255) NOT NULL,
  `OrderStatus` enum('Pending','Finished') DEFAULT 'Pending',
  `IsActive` tinyint(1) DEFAULT 1,
  `IsDelete` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Food_Order_Detail`
--

CREATE TABLE `Food_Order_Detail` (
  `ID` int(11) NOT NULL,
  `MenuItemID` int(11) NOT NULL,
  `FoID` int(11) NOT NULL,
  `ItemPrice` int(11) NOT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `IsDelete` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Menu_Item`
--

CREATE TABLE `Menu_Item` (
  `ID` int(11) NOT NULL,
  `PlaceID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Description` longtext DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `PhotoURL` varchar(255) DEFAULT NULL,
  `FoodType` enum('Veg','NonVeg') DEFAULT 'Veg',
  `Price` varchar(255) NOT NULL,
  `Ingredients` longtext DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `IsDelete` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Menu_Item`
--

INSERT INTO `Menu_Item` (`ID`, `PlaceID`, `CategoryID`, `Description`, `Name`, `PhotoURL`, `FoodType`, `Price`, `Ingredients`, `IsActive`, `IsDelete`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 'Dive into the crispy cheesy chicken patty, bursting with melted cheese and flavours.', 'pizza', NULL, 'Veg', '20', 'cheese,olives', 1, 0, '2021-04-20 17:33:38', '2021-04-20 17:33:38'),
(2, 2, 2, 'chicken burger', 'Burger', NULL, 'NonVeg', '75', 'chicken,cheese,lattece', 1, 0, '2021-04-20 19:41:33', '2021-04-20 19:41:33'),
(3, 2, 1, 'crispy french fries with salt and peri peri', 'French fries', NULL, 'Veg', '80', 'potatoes,Salt', 1, 0, '2021-04-21 17:47:34', '2021-04-21 17:47:34');

-- --------------------------------------------------------

--
-- Table structure for table `Place`
--

CREATE TABLE `Place` (
  `ID` int(11) NOT NULL,
  `PlaceName` varchar(255) NOT NULL,
  `PlaceSlug` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Logo` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `IsDelete` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Place`
--

INSERT INTO `Place` (`ID`, `PlaceName`, `PlaceSlug`, `Password`, `Logo`, `IsActive`, `IsDelete`, `createdAt`, `updatedAt`) VALUES
(1, 'bfbcb', ' xbch', '$2a$10$Bm6ix1tdhQiDlWC6vMHH2ek7oRvEqYZlYqtxih7QCPqmnEezJAIaq', NULL, 1, 0, '2021-04-17 18:31:58', '2021-04-17 18:31:58'),
(2, 'Teapost', 'teapost', '$2a$10$jEPuwSVBRKJffWbfATqug.5Cm1ZIBIbMPkn07Fth9D99Qnuy.1iv6', NULL, 1, 0, '2021-04-17 18:55:55', '2021-04-17 18:55:55');

-- --------------------------------------------------------

--
-- Table structure for table `Reviews`
--

CREATE TABLE `Reviews` (
  `ID` int(11) NOT NULL,
  `PlaceID` int(11) NOT NULL,
  `Review` varchar(255) NOT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `IsDelete` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PlaceID` (`PlaceID`);

--
-- Indexes for table `Food_Order`
--
ALTER TABLE `Food_Order`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PlaceID` (`PlaceID`);

--
-- Indexes for table `Food_Order_Detail`
--
ALTER TABLE `Food_Order_Detail`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `MenuItemID` (`MenuItemID`),
  ADD KEY `FoID` (`FoID`);

--
-- Indexes for table `Menu_Item`
--
ALTER TABLE `Menu_Item`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PlaceID` (`PlaceID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `Place`
--
ALTER TABLE `Place`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PlaceID` (`PlaceID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Food_Order`
--
ALTER TABLE `Food_Order`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Food_Order_Detail`
--
ALTER TABLE `Food_Order_Detail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Menu_Item`
--
ALTER TABLE `Menu_Item`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Place`
--
ALTER TABLE `Place`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Reviews`
--
ALTER TABLE `Reviews`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Categories`
--
ALTER TABLE `Categories`
  ADD CONSTRAINT `Categories_ibfk_1` FOREIGN KEY (`PlaceID`) REFERENCES `Place` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Food_Order`
--
ALTER TABLE `Food_Order`
  ADD CONSTRAINT `Food_Order_ibfk_1` FOREIGN KEY (`PlaceID`) REFERENCES `Place` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Food_Order_Detail`
--
ALTER TABLE `Food_Order_Detail`
  ADD CONSTRAINT `Food_Order_Detail_ibfk_1` FOREIGN KEY (`MenuItemID`) REFERENCES `Menu_Item` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Food_Order_Detail_ibfk_2` FOREIGN KEY (`FoID`) REFERENCES `Food_Order` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Menu_Item`
--
ALTER TABLE `Menu_Item`
  ADD CONSTRAINT `Menu_Item_ibfk_1` FOREIGN KEY (`PlaceID`) REFERENCES `Place` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Menu_Item_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `Categories` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`PlaceID`) REFERENCES `Place` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
