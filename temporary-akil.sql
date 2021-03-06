-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 28, 2021 at 10:40 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `temporary-akil`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
CREATE TABLE IF NOT EXISTS `assets` (
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

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `customer_ID` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(30) NOT NULL,
  `customer_phone` varchar(15) DEFAULT NULL,
  `customer_province` varchar(15) DEFAULT NULL,
  `customer_district` varchar(15) DEFAULT NULL,
  `customer_town` varchar(20) DEFAULT NULL,
  `customer_address` varchar(100) DEFAULT NULL,
  `customer_due` double NOT NULL,
  `notes` varchar(100) DEFAULT NULL,
  `customer_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`customer_ID`),
  UNIQUE KEY `customer_phone` (`customer_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=1034 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_ID`, `customer_name`, `customer_phone`, `customer_province`, `customer_district`, `customer_town`, `customer_address`, `customer_due`, `notes`, `customer_status`) VALUES
(1001, 'test', '12341234', 'الجنوب', 'صور', 'صور', 'البص', 0, NULL, 1),
(1002, 'test 2', '81025354', 'test', NULL, 'شقرا', NULL, 0, NULL, 1),
(1003, 'testing 3', '03323434', 'jlasdkjf', 'alsdkjfaskldfj', NULL, NULL, 0, NULL, 1),
(1004, 'hadi ahmad', '70846278', 'asdf', NULL, NULL, NULL, 0, NULL, 1),
(1026, 'ali', '81923819', 'aaita', 'عيال عاذك', NULL, NULL, 170000, 'laskdjf alksdjf', 1),
(1027, 'ahmad', '03584685', 'lasdkjf', 'laskdjf', NULL, NULL, 250000, NULL, 1),
(1028, 'hadi', '03487563', 'alsdkfj', 'asldkfj', NULL, NULL, 110000, NULL, 1),
(1029, 'mohamad', '02839423', 'lsasdlfkj', 'alskdjfa', NULL, NULL, 0, 'asdfasdf', 1),
(1031, 'حسن', '07777777', 'مشسيبتن', NULL, NULL, NULL, 400000, NULL, 1),
(1032, 'asdfsadfasdf', '03456476', 'asdfsdaf', NULL, NULL, NULL, 0, NULL, 1),
(1033, 'جديد', '03985648', 'النبطية', 'بنت جبيل', 'عيناتا', 'البركة', 0, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer_payments`
--

DROP TABLE IF EXISTS `customer_payments`;
CREATE TABLE IF NOT EXISTS `customer_payments` (
  `payment_ID` int(11) NOT NULL AUTO_INCREMENT,
  `customer_ID_FK` int(11) NOT NULL,
  `payment_amount` float NOT NULL,
  `payment_date` date NOT NULL,
  `payment_time` time NOT NULL,
  `payment_notes` varchar(50) DEFAULT NULL,
  `payment_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`payment_ID`),
  KEY `customer_ID_FK` (`customer_ID_FK`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `customer_payments`
--

INSERT INTO `customer_payments` (`payment_ID`, `customer_ID_FK`, `payment_amount`, `payment_date`, `payment_time`, `payment_notes`, `payment_status`) VALUES
(1, 1004, 4000, '2021-02-27', '03:07:32', '', 1),
(2, 1028, 50000, '2021-02-27', '03:09:20', '', 1),
(3, 1028, 350000, '2021-02-27', '03:09:54', '', 1),
(4, 1028, 390000, '2021-02-27', '16:28:13', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
CREATE TABLE IF NOT EXISTS `drivers` (
  `driver_ID` int(10) NOT NULL AUTO_INCREMENT,
  `driver_name` varchar(50) NOT NULL,
  `driver_phone` varchar(10) NOT NULL,
  `driver_address` varchar(50) DEFAULT NULL,
  `driver_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`driver_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`driver_ID`, `driver_name`, `driver_phone`, `driver_address`, `driver_status`) VALUES
(1, 'ahmad hamdan', '71156894', 'tebnin haris main', 1),
(2, 'mostapha hussein', '03658456', NULL, 1),
(3, 'hassan hawi', '81789687', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `drivers_invoice`
--

DROP TABLE IF EXISTS `drivers_invoice`;
CREATE TABLE IF NOT EXISTS `drivers_invoice` (
  `invoice_ID` int(10) NOT NULL AUTO_INCREMENT,
  `driver_ID_FK` int(10) NOT NULL,
  `pickup_date` date NOT NULL,
  `pickup_time` time NOT NULL,
  `total_value` double NOT NULL,
  `invoice_isDelivered` tinyint(1) NOT NULL DEFAULT '0',
  `invoice_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`invoice_ID`),
  KEY `drivers_invoice_ibfk_1` (`driver_ID_FK`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `drivers_invoice`
--

INSERT INTO `drivers_invoice` (`invoice_ID`, `driver_ID_FK`, `pickup_date`, `pickup_time`, `total_value`, `invoice_isDelivered`, `invoice_status`) VALUES
(1001, 1, '2021-02-25', '20:58:18', 1154000, 1, 1),
(1002, 3, '2021-02-28', '17:59:23', 1596000, 1, 1),
(1003, 2, '2021-02-28', '17:59:51', 317000, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_map`
--

DROP TABLE IF EXISTS `invoice_map`;
CREATE TABLE IF NOT EXISTS `invoice_map` (
  `map_ID` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_ID_FK` int(10) NOT NULL,
  `order_ID_FK` int(10) NOT NULL,
  PRIMARY KEY (`map_ID`),
  KEY `invoice_map_ibfk_1` (`invoice_ID_FK`),
  KEY `order_ID_FK` (`order_ID_FK`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invoice_map`
--

INSERT INTO `invoice_map` (`map_ID`, `invoice_ID_FK`, `order_ID_FK`) VALUES
(12, 1001, 3),
(15, 1001, 6),
(16, 1001, 19),
(18, 1001, 5),
(19, 1001, 14),
(20, 1002, 18),
(21, 1002, 20),
(22, 1002, 21),
(23, 1002, 22),
(24, 1003, 15),
(25, 1003, 16),
(26, 1003, 17);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_ID` int(100) NOT NULL AUTO_INCREMENT,
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
  `order_isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_ID`),
  KEY `customer_ID_FK` (`customer_ID_FK`),
  KEY `orders_ibfk_2` (`driver_ID_FK`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_ID`, `customer_ID_FK`, `track_number`, `order_date`, `order_time`, `destination_province`, `destination_district`, `destination_town`, `destination_address`, `recipient_name`, `recipient_phone`, `order_value`, `delivery_fee`, `order_status`, `order_notes`, `driver_ID_FK`, `order_isDeleted`) VALUES
(3, 1026, 9856, '2021-02-15', '22:06:19', 'النبطية', 'بنت جبيل', 'عيتا الجبل', 'الخرجة', 'رينغو كافيه', '70896584', 154000, 10000, 'delivered', NULL, NULL, 0),
(4, 1029, 2354, '2021-02-16', '15:09:45', 'النبطية', 'بنت جبيل', 'تبنين', 'اليادون', 'محمد فواز', '71458791', 550000, 10000, 'office', NULL, NULL, 0),
(5, 1004, 5789, '2021-02-15', '22:06:19', 'النبطية', 'بنت جبيل', 'شقرا', 'البركة، مقابل قهوة القهوة', 'Ali hamdan', '70896584', 370000, 10000, 'delivered', NULL, NULL, 0),
(6, 1028, 1587, '2021-02-15', '22:06:19', 'النبطية', 'بنت جبيل', 'حاريص', 'البركة، مقابل باتسري ناصر', 'Ali hadi', '70896879', 370000, 10000, 'delivered', NULL, NULL, 0),
(7, 1001, 5642165, '2021-02-16', '15:48:42', 'الجنوب', 'صور', 'حاريص', 'testnig', 'asdfasdf', '05464516', 60000, 10000, 'office', NULL, NULL, 0),
(8, 1027, 89564, '2021-02-16', '15:50:36', 'بيروت', NULL, 'شقرا', 'fasdfasdf', 'asdfasdf', '01516513', 50000, 10000, 'office', NULL, NULL, 0),
(9, 1004, 23423, '2021-02-16', '17:04:37', 'بيروت', NULL, 'تبنين', '234', 'asdf', '00000324', 12000, 10000, 'office', '', NULL, 0),
(10, 1004, 234, '2021-02-16', '17:08:01', 'بيروت', NULL, 'شقرا', 'asdfasdf', 'sadf', '00000234', 12000, 10000, 'office', NULL, NULL, 0),
(11, 1029, 788554, '2021-02-15', '17:51:51', 'عكار', 'عكار', 'صفد البطيخ', 'المنية', 'محمد مصطفى', '81789564', 79000, 10000, 'office', NULL, NULL, 0),
(12, 1026, 234234, '2021-02-16', '17:54:46', 'البقاع', 'البقاع  الغربي', 'تبنين', 'شسيب', 'شيسب', '00000234', 120000, 10000, 'office', NULL, NULL, 0),
(13, 1002, 234234234, '2021-02-16', '18:24:51', 'كسروان جبيل', 'جبيل', 'جبيل', 'سشيب', 'شسيبسشيب', '03897564', 50000, 12000, 'office', NULL, NULL, 0),
(14, 1032, 13584513, '2021-02-22', '15:22:33', 'النبطية', 'بنت جبيل', 'شقرا', 'test', 'سالي عواركة', '03897564', 40000, 10000, 'delivered', 'test test', NULL, 0),
(15, 1004, 7896, '2021-02-23', '23:31:14', 'النبطية', 'النبطية', 'النبطية', 'شارع نبيه بري، مقابل محطة الأيتام', 'test', '03658975', 70000, 10000, 'driver', 'leave order', NULL, 0),
(16, 1028, 6845, '2021-02-24', '01:25:26', 'الجنوب', 'صور', 'صور', 'test', 'test', '70854685', 97000, 10000, 'driver', NULL, NULL, 0),
(17, 1003, 1234, '2021-02-24', '12:41:17', 'الجنوب', 'صيدا', 'الغازية', 'الكورنيش البحري', 'ali mohamad', '81128456', 120000, 10000, 'driver', NULL, NULL, 0),
(18, 1029, 2345, '2021-02-24', '13:19:34', 'جبل لبنان', 'بعبدا', 'حارة حريك', 'بير العبد', 'test', '71148564', 156000, 10000, 'delivered', NULL, NULL, 0),
(19, 1026, 7896, '2021-02-26', '00:45:34', 'الجنوب', 'صور', 'العباسية', 'حي الجامعة', 'محمد حاوي', '71487241', 170000, 10000, 'delivered', NULL, NULL, 0),
(20, 1027, 7894, '2021-02-26', '00:48:41', 'النبطية', 'النبطية', 'حاروف', 'دوار حاروف', 'هادي حرب', '70142741', 250000, 10000, 'delivered', NULL, NULL, 0),
(21, 1031, 234567, '2021-02-26', '00:53:24', 'الجنوب', 'صور', 'صور', 'test', 'test', '81221415', 400000, 10000, 'delivered', NULL, NULL, 0),
(22, 1028, 57475, '2021-02-26', '03:11:14', 'الجنوب', 'صور', 'صور', 'البص', 'test', '71546854', 750000, 10000, 'delivered', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_ID` int(10) NOT NULL AUTO_INCREMENT,
  `payment_title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `amount` int(10) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `notes` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`payment_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_ID`, `payment_title`, `category`, `amount`, `date`, `time`, `notes`) VALUES
(1, 'test', 'test', 250000, '2019-01-19', '01:26:59', ''),
(2, 'ghadir', 'ghadir', 50000, '2019-01-28', '12:35:56', ''),
(3, 'testq', 'test', 80000, '2019-02-08', '20:47:42', ''),
(4, 'testtest', '234234', 80000, '2019-02-09', '01:44:47', ''),
(5, 'hala', 'hala', 40000, '2019-02-09', '01:45:10', ''),
(6, 'hhh', 'hhh', 80000, '2019-02-09', '16:50:23', ''),
(7, 'y', 'y', 20000, '2019-02-09', '16:51:49', ''),
(8, 'fix bug', 'gih', 20000, '2019-02-09', '16:52:47', ''),
(9, 'test', 'test', 40000, '2019-02-09', '16:54:32', ''),
(10, 'test', 'tets', 20000, '2019-02-09', '16:54:53', ''),
(11, 'test', 'test', 20000, '2019-02-09', '16:58:52', ''),
(12, 'test', 'test', 20000, '2019-02-09', '16:59:30', ''),
(13, 'test', 'test', 50000, '2019-02-09', '19:57:14', ''),
(15, 'test', 'test', 20000, '2019-02-10', '15:26:08', ''),
(16, 'test', 'test', 50000, '2019-02-20', '12:40:32', ''),
(17, 'test', 'test', 50000, '2019-04-26', '18:13:54', ''),
(18, 'test', 'test', 40000, '2019-04-26', '18:16:57', ''),
(19, 'test', 'test', 60000, '2019-04-30', '17:26:38', ''),
(20, 'ghadir', 'salary', 500000, '2019-08-11', '15:29:31', '');

-- --------------------------------------------------------

--
-- Table structure for table `pickup_invoice`
--

DROP TABLE IF EXISTS `pickup_invoice`;
CREATE TABLE IF NOT EXISTS `pickup_invoice` (
  `pickup_ID` int(11) NOT NULL AUTO_INCREMENT,
  `driver_ID_FK` int(15) NOT NULL,
  `pickup_date` date NOT NULL,
  `pickup_time` time NOT NULL,
  `total_value` double NOT NULL,
  `pickup_isCompleted` tinyint(1) NOT NULL DEFAULT '0',
  `pickup_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`pickup_ID`),
  KEY `pickup_invoice_ibfk_1` (`driver_ID_FK`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pickup_invoice`
--

INSERT INTO `pickup_invoice` (`pickup_ID`, `driver_ID_FK`, `pickup_date`, `pickup_time`, `total_value`, `pickup_isCompleted`, `pickup_status`) VALUES
(1, 1, '2021-02-28', '17:44:27', 120000, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pickup_map`
--

DROP TABLE IF EXISTS `pickup_map`;
CREATE TABLE IF NOT EXISTS `pickup_map` (
  `map_ID` int(15) NOT NULL AUTO_INCREMENT,
  `pickup_ID_FK` int(15) NOT NULL,
  `customer_ID_FK` int(15) NOT NULL,
  `order_count` int(11) NOT NULL,
  `total_paid` double NOT NULL,
  PRIMARY KEY (`map_ID`),
  KEY `pickup_map_ibfk_1` (`pickup_ID_FK`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pickup_map`
--

INSERT INTO `pickup_map` (`map_ID`, `pickup_ID_FK`, `customer_ID_FK`, `order_count`, `total_paid`) VALUES
(1, 1, 1004, 5, 120000);

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

DROP TABLE IF EXISTS `reminders`;
CREATE TABLE IF NOT EXISTS `reminders` (
  `reminder_ID` int(11) NOT NULL AUTO_INCREMENT,
  `reminder_title` varchar(100) NOT NULL,
  `reminder_text` text,
  `reminder_type` varchar(15) NOT NULL DEFAULT 'text',
  `due_date` date DEFAULT NULL,
  `due_time` time DEFAULT NULL,
  `repeat_reminder` varchar(10) DEFAULT NULL,
  `reminder_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`reminder_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
CREATE TABLE IF NOT EXISTS `stock` (
  `IID` int(10) NOT NULL AUTO_INCREMENT,
  `barcode` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `item_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `item_qty` int(10) DEFAULT NULL,
  `item_currency` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `item_cost` float DEFAULT NULL,
  `item_price` float DEFAULT NULL,
  `notes` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_hidden` tinyint(1) NOT NULL DEFAULT '0',
  `item_status` tinyint(1) NOT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`IID`, `barcode`, `item_name`, `item_qty`, `item_currency`, `item_cost`, `item_price`, `notes`, `is_hidden`, `item_status`) VALUES
(1, '12345', 'test test', 0, 'dollar', 3.33333, 8, '', 0, 0),
(2, '123', 'iPhone charger', -3, 'dollar', 4, 10, '', 0, 1),
(3, '555', 'Laptop Toshiba', 3, 'dollar', 53.5, 80, '', 1, 1),
(4, '814914023938', 'Lazer Jet Pro Printer HP', 0, 'dollar', 26, 40, '', 0, 1),
(5, '6936103601039', 'hp toner 139 black', 4, 'dollar', 8, 16, '', 0, 1),
(6, '6935364051242', 'TP-Link Router', 3, 'dollar', 13, 20, '', 0, 1),
(7, '', 'test', 1, 'dollar', 10, 13.3333, '', 0, 0),
(8, '1234', 'HDMI Cable', 0, 'dollar', 5, 10, '', 1, 1),
(9, '', 'USB for Samsung', 7, 'dollar', 3, 8, '', 1, 1),
(10, '', 'Laptop Battery', 9, 'dollar', 33, 60, '', 0, 1),
(11, '', 'test 6', 10, 'dollar', 0.666667, 3.33333, '', 0, 0),
(12, '', 'almost theres', 0, 'dollar', 5, 9, '', 1, 1),
(13, '', 'test 1000', 8, 'dollar', 11, 33, '', 1, 1),
(14, '03054839', 'iPhone XS Max Cover', 3, 'dollar', 20, 30, '', 0, 1),
(15, '80129', 'testhahah', 49, 'dollar', 40, 66, '', 0, 1),
(16, '234234', 'teast', 0, 'dollar', 4, 8, '', 0, 1),
(17, '67898765', 'testtest', 1, 'dollar', 0.666667, 3.33333, '', 0, 1),
(18, '', 'fixed', 0, 'dollar', 2, 5, '', 0, 1),
(19, '', 'blabla', 0, 'dollar', 1, 2, '', 0, 1),
(20, NULL, 'asdf', 0, 'dollar', 16, 20, NULL, 0, 1),
(21, NULL, 'test', 0, 'dollar', 0.000666667, 33.3333, NULL, 0, 0),
(22, NULL, 'hahahah', 0, 'dollar', 5, 10, NULL, 0, 1),
(23, NULL, 'test', 0, 'dollar', 0.000666667, 0.002, NULL, 0, 0),
(24, NULL, 'testtest', 0, 'dollar', 0.000666667, 0.00133333, NULL, 0, 0),
(25, NULL, 'new test', 0, 'dollar', 3.33333, 6.66667, NULL, 0, 1),
(26, NULL, 'iphone xs max', 10, 'dollar', 0.000666667, 6, NULL, 0, 0),
(27, NULL, 'new test stock data', 10, 'dollar', 33.3333, 60, NULL, 0, 0),
(28, '823490123', 'test', 10, 'dollar', 3.33333, 6.66667, NULL, 0, 1),
(29, NULL, 'new update', 6, 'dollar', 9, 20, NULL, 0, 1),
(30, NULL, 'testttestaslkdjf', 10, 'dollar', 20, 30, NULL, 0, 1),
(31, NULL, 'jhghgfmgf', 0, 'dollar', 80, 120, NULL, 0, 1),
(32, NULL, 'test currency', 0, 'lira', 5000, 10000, NULL, 0, 1),
(33, NULL, '2', 1, 'lira', 10000, 20000, NULL, 0, 1),
(34, NULL, '1', 5, 'lira', 80000, 100000, NULL, 0, 1),
(35, NULL, 'aj;lskfjas;lkdjflkjsd', 0, 'dollar', 2, 5, NULL, 0, 1),
(36, NULL, 'test LBP', 1, 'lira', 2000, 3000, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UID` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `owner` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `canAddService` tinyint(1) NOT NULL DEFAULT '0',
  `canAddItem` tinyint(1) NOT NULL DEFAULT '0',
  `canViewCustomers` tinyint(1) NOT NULL DEFAULT '0',
  `canViewPayments` tinyint(1) NOT NULL DEFAULT '0',
  `user_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`UID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UID`, `username`, `password`, `type`, `owner`, `canAddService`, `canAddItem`, `canViewCustomers`, `canViewPayments`, `user_status`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'admin', 1, 1, 1, 1, 1),
(2, 'user', 'ee11cbb19052e40b07aac0ca060c23ee', 'user', 'ghadir', 1, 1, 1, 0, 1),
(3, 'jaafar', '21232f297a57a5a743894a0e4a801fc3', 'user', 'jeff', 0, 0, 0, 0, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_payments`
--
ALTER TABLE `customer_payments`
  ADD CONSTRAINT `customer_payments_ibfk_1` FOREIGN KEY (`customer_ID_FK`) REFERENCES `customers` (`customer_ID`);

--
-- Constraints for table `drivers_invoice`
--
ALTER TABLE `drivers_invoice`
  ADD CONSTRAINT `drivers_invoice_ibfk_1` FOREIGN KEY (`driver_ID_FK`) REFERENCES `drivers` (`driver_ID`) ON DELETE NO ACTION;

--
-- Constraints for table `invoice_map`
--
ALTER TABLE `invoice_map`
  ADD CONSTRAINT `invoice_map_ibfk_1` FOREIGN KEY (`invoice_ID_FK`) REFERENCES `drivers_invoice` (`invoice_ID`) ON DELETE NO ACTION,
  ADD CONSTRAINT `invoice_map_ibfk_2` FOREIGN KEY (`order_ID_FK`) REFERENCES `orders` (`order_ID`) ON DELETE NO ACTION;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_ID_FK`) REFERENCES `customers` (`customer_ID`) ON DELETE NO ACTION,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`driver_ID_FK`) REFERENCES `drivers` (`driver_ID`) ON DELETE NO ACTION;

--
-- Constraints for table `pickup_invoice`
--
ALTER TABLE `pickup_invoice`
  ADD CONSTRAINT `pickup_invoice_ibfk_1` FOREIGN KEY (`driver_ID_FK`) REFERENCES `drivers` (`driver_ID`) ON DELETE NO ACTION;

--
-- Constraints for table `pickup_map`
--
ALTER TABLE `pickup_map`
  ADD CONSTRAINT `pickup_map_ibfk_1` FOREIGN KEY (`pickup_ID_FK`) REFERENCES `pickup_invoice` (`pickup_ID`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
