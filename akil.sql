-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2021 at 08:47 PM
-- Server version: 8.0.12
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `akil`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `assets` int(10) NOT NULL,
  `exchange_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`assets`, `exchange_rate`) VALUES
(1710000, 3000);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_ID` int(11) NOT NULL,
  `customer_name` varchar(30) NOT NULL,
  `customer_phone` varchar(15) DEFAULT NULL,
  `customer_province` varchar(15) DEFAULT NULL,
  `customer_district` varchar(15) DEFAULT NULL,
  `customer_town` varchar(20) DEFAULT NULL,
  `customer_address` varchar(100) DEFAULT NULL,
  `customer_due` double NOT NULL,
  `notes` varchar(100) DEFAULT NULL,
  `customer_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customer_payments`
--

CREATE TABLE `customer_payments` (
  `payment_ID` int(11) NOT NULL,
  `customer_ID_FK` int(11) NOT NULL,
  `payment_amount` float NOT NULL,
  `payment_date` date NOT NULL,
  `payment_time` time NOT NULL,
  `payment_notes` varchar(50) DEFAULT NULL,
  `payment_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `driver_ID` int(10) NOT NULL,
  `driver_name` varchar(50) NOT NULL,
  `driver_phone` varchar(10) NOT NULL,
  `driver_address` varchar(50) DEFAULT NULL,
  `driver_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `drivers_invoice`
--

CREATE TABLE `drivers_invoice` (
  `invoice_ID` int(10) NOT NULL,
  `driver_ID_FK` int(10) NOT NULL,
  `pickup_date` date NOT NULL,
  `pickup_time` time NOT NULL,
  `total_value` double NOT NULL,
  `invoice_isDelivered` tinyint(1) NOT NULL DEFAULT '0',
  `invoice_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_map`
--

CREATE TABLE `invoice_map` (
  `map_ID` int(11) NOT NULL,
  `invoice_ID_FK` int(10) NOT NULL,
  `order_ID_FK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_ID` int(100) NOT NULL,
  `customer_ID_FK` int(10) NOT NULL,
  `track_number` int(100) DEFAULT NULL,
  `order_date` date NOT NULL,
  `order_time` time NOT NULL,
  `destination_province` varchar(20) NOT NULL,
  `destination_district` varchar(20) DEFAULT NULL,
  `destination_town` varchar(20) NOT NULL,
  `destination_address` varchar(100) NOT NULL,
  `recipient_name` varchar(50) NOT NULL,
  `recipient_phone` varchar(10) NOT NULL,
  `order_value` double NOT NULL,
  `delivery_fee` float NOT NULL,
  `order_status` varchar(20) NOT NULL,
  `order_notes` varchar(100) DEFAULT NULL,
  `driver_ID_FK` int(10) DEFAULT NULL,
  `order_isDeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_ID` int(10) NOT NULL,
  `payment_title` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `amount` int(10) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `notes` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pickup_invoice`
--

CREATE TABLE `pickup_invoice` (
  `pickup_ID` int(11) NOT NULL,
  `driver_ID_FK` int(15) NOT NULL,
  `pickup_date` date NOT NULL,
  `pickup_time` time NOT NULL,
  `total_value` double NOT NULL,
  `pickup_isCompleted` tinyint(1) NOT NULL DEFAULT '0',
  `pickup_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pickup_map`
--

CREATE TABLE `pickup_map` (
  `map_ID` int(15) NOT NULL,
  `pickup_ID_FK` int(15) NOT NULL,
  `customer_ID_FK` int(15) NOT NULL,
  `order_count` int(11) NOT NULL,
  `total_paid` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `reminder_ID` int(11) NOT NULL,
  `reminder_title` varchar(100) NOT NULL,
  `reminder_text` text,
  `reminder_type` varchar(15) NOT NULL DEFAULT 'text',
  `due_date` date DEFAULT NULL,
  `due_time` time DEFAULT NULL,
  `repeat_reminder` varchar(10) DEFAULT NULL,
  `reminder_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UID` int(10) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `owner` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `canAddService` tinyint(1) NOT NULL DEFAULT '0',
  `canAddItem` tinyint(1) NOT NULL DEFAULT '0',
  `canViewCustomers` tinyint(1) NOT NULL DEFAULT '0',
  `canViewPayments` tinyint(1) NOT NULL DEFAULT '0',
  `user_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UID`, `username`, `password`, `type`, `owner`, `canAddService`, `canAddItem`, `canViewCustomers`, `canViewPayments`, `user_status`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'admin', 1, 1, 1, 1, 1),
(2, 'user', 'ee11cbb19052e40b07aac0ca060c23ee', 'user', 'user', 1, 1, 1, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_ID`),
  ADD UNIQUE KEY `customer_phone` (`customer_phone`);

--
-- Indexes for table `customer_payments`
--
ALTER TABLE `customer_payments`
  ADD PRIMARY KEY (`payment_ID`),
  ADD KEY `customer_ID_FK` (`customer_ID_FK`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driver_ID`);

--
-- Indexes for table `drivers_invoice`
--
ALTER TABLE `drivers_invoice`
  ADD PRIMARY KEY (`invoice_ID`),
  ADD KEY `drivers_invoice_ibfk_1` (`driver_ID_FK`);

--
-- Indexes for table `invoice_map`
--
ALTER TABLE `invoice_map`
  ADD PRIMARY KEY (`map_ID`),
  ADD KEY `invoice_map_ibfk_1` (`invoice_ID_FK`),
  ADD KEY `order_ID_FK` (`order_ID_FK`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_ID`),
  ADD KEY `customer_ID_FK` (`customer_ID_FK`),
  ADD KEY `orders_ibfk_2` (`driver_ID_FK`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_ID`);

--
-- Indexes for table `pickup_invoice`
--
ALTER TABLE `pickup_invoice`
  ADD PRIMARY KEY (`pickup_ID`),
  ADD KEY `pickup_invoice_ibfk_1` (`driver_ID_FK`);

--
-- Indexes for table `pickup_map`
--
ALTER TABLE `pickup_map`
  ADD PRIMARY KEY (`map_ID`),
  ADD KEY `pickup_map_ibfk_1` (`pickup_ID_FK`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`reminder_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_payments`
--
ALTER TABLE `customer_payments`
  MODIFY `payment_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `driver_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drivers_invoice`
--
ALTER TABLE `drivers_invoice`
  MODIFY `invoice_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23001;

--
-- AUTO_INCREMENT for table `invoice_map`
--
ALTER TABLE `invoice_map`
  MODIFY `map_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1001;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pickup_invoice`
--
ALTER TABLE `pickup_invoice`
  MODIFY `pickup_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5001;

--
-- AUTO_INCREMENT for table `pickup_map`
--
ALTER TABLE `pickup_map`
  MODIFY `map_ID` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `reminder_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_payments`
--
ALTER TABLE `customer_payments`
  ADD CONSTRAINT `customer_payments_ibfk_1` FOREIGN KEY (`customer_ID_FK`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `drivers_invoice`
--
ALTER TABLE `drivers_invoice`
  ADD CONSTRAINT `drivers_invoice_ibfk_1` FOREIGN KEY (`driver_ID_FK`) REFERENCES `drivers` (`driver_id`);

--
-- Constraints for table `invoice_map`
--
ALTER TABLE `invoice_map`
  ADD CONSTRAINT `invoice_map_ibfk_1` FOREIGN KEY (`invoice_ID_FK`) REFERENCES `drivers_invoice` (`invoice_id`),
  ADD CONSTRAINT `invoice_map_ibfk_2` FOREIGN KEY (`order_ID_FK`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_ID_FK`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`driver_ID_FK`) REFERENCES `drivers` (`driver_id`);

--
-- Constraints for table `pickup_invoice`
--
ALTER TABLE `pickup_invoice`
  ADD CONSTRAINT `pickup_invoice_ibfk_1` FOREIGN KEY (`driver_ID_FK`) REFERENCES `drivers` (`driver_id`);

--
-- Constraints for table `pickup_map`
--
ALTER TABLE `pickup_map`
  ADD CONSTRAINT `pickup_map_ibfk_1` FOREIGN KEY (`pickup_ID_FK`) REFERENCES `pickup_invoice` (`pickup_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
