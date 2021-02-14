-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2021 at 12:24 PM
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
-- Database: `temporary-akil`
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
  `customer_phone` bigint(15) DEFAULT NULL,
  `customer_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customer_address_2` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customer_due` float NOT NULL,
  `notes` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customer_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_ID`, `customer_name`, `customer_phone`, `customer_address`, `customer_address_2`, `customer_due`, `notes`, `customer_status`) VALUES
(1001, 'test', 12341234, 'test', NULL, 0, NULL, 1),
(1002, 'test 2', 999999999, NULL, NULL, 0, NULL, 1),
(1003, 'testing 3', 232343, 'jlasdkjf', 'alsdkjfaskldfj', 0, NULL, 1),
(1004, 'asdfasdfasdf', 70846278, 'asdf', NULL, 0, NULL, 1),
(1026, 'ali', 819238192, 'aaita el jabal, kdkal', 'عيال عاذك', 0, 'laskdjf alksdjf', 1);

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
  `dollar_exchange` float NOT NULL,
  `payment_notes` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `payment_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `customer_payments`
--

INSERT INTO `customer_payments` (`payment_ID`, `customer_ID_FK`, `payment_amount`, `payment_date`, `payment_time`, `dollar_exchange`, `payment_notes`, `payment_status`) VALUES
(1, 1, 50000, '2019-11-29', '12:52:49', 0, NULL, 1),
(2, 1, 90000, '2019-12-07', '12:14:00', 0, NULL, 1),
(3, 1, 80000, '2019-12-07', '12:14:46', 0, NULL, 1),
(4, 2, 10000, '2019-12-07', '12:16:06', 0, NULL, 1),
(5, 3, 50000, '2019-12-07', '12:17:23', 0, NULL, 1),
(6, 3, 10000, '2019-12-07', '12:18:08', 0, NULL, 1),
(7, 4, 100000, '2019-12-07', '12:18:18', 0, NULL, 1),
(8, 6, 60000, '2019-12-07', '12:18:27', 0, NULL, 1),
(9, 6, 50000, '2019-12-07', '12:18:33', 0, NULL, 1),
(11, 3, 90000, '2019-12-07', '12:19:08', 0, NULL, 1),
(12, 4, 50000, '2019-12-07', '12:52:07', 0, NULL, 1),
(13, 4, 60000, '2019-12-07', '12:52:14', 0, NULL, 1),
(14, 6, 60000, '2019-12-07', '12:52:59', 0, NULL, 1),
(15, 1, 60000, '2019-12-08', '17:31:55', 0, NULL, 1),
(16, 3, 70000, '2019-12-13', '23:20:10', 0, NULL, 1),
(17, 3, 5000, '2019-12-16', '15:17:34', 0, NULL, 1),
(18, 2, 8000, '2019-12-16', '15:24:49', 0, NULL, 1),
(19, 2, 100000, '2019-12-16', '15:25:24', 0, NULL, 1),
(20, 6, 100000, '2019-12-16', '22:30:22', 0, NULL, 1),
(21, 6, 100000, '2019-12-16', '22:30:52', 0, NULL, 1),
(22, 2, 3000, '2020-04-14', '14:06:11', 3000, NULL, 1),
(23, 2, 3000, '2020-04-14', '14:08:16', 3000, NULL, 1),
(24, 1, 8000, '2020-04-14', '14:08:52', 3000, NULL, 1),
(25, 1, 10000, '2020-04-21', '23:26:24', 3000, NULL, 1),
(26, 3, 20000, '2020-11-28', '20:54:13', 3000, '', 1),
(27, 3, 5000, '2020-11-28', '20:54:31', 3000, '', 1),
(28, 3, 1000, '2020-11-28', '20:54:47', 3000, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `debts`
--

CREATE TABLE `debts` (
  `debt_ID` int(11) NOT NULL,
  `customer_ID_FK` int(11) NOT NULL,
  `item_type` varchar(10) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `amount` float NOT NULL,
  `remaining` float NOT NULL,
  `debt_date` date NOT NULL,
  `notes` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `debt_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `debts`
--

INSERT INTO `debts` (`debt_ID`, `customer_ID_FK`, `item_type`, `item_name`, `amount`, `remaining`, `debt_date`, `notes`, `debt_status`) VALUES
(1, 1, 'Service', 'touch 10$', 14000, 0, '2019-03-20', '', 0),
(2, 2, 'Stock', 'laptop', 120000, 0, '2019-03-20', '', 0),
(3, 3, 'Service', 'steam 20$', 35000, 0, '2019-04-01', '', 0),
(4, 4, 'Stock', 'printer', 60000, 0, '2019-04-01', '', 0),
(5, 3, 'Service', 'alfa 1 month', 40000, 0, '2019-04-01', '', 0),
(6, 1, 'Service', 'alfa 1 month', 40000, 0, '2019-04-01', '', 0),
(7, 2, 'Stock', 'tttttt', 12000, 0, '2019-04-01', '', 0),
(8, 2, 'Stock', 'printer', 60000, 0, '2019-04-01', '', 0),
(9, 5, 'Stock', 'tttttt', 12000, 0, '2019-04-01', '', 0),
(10, 6, 'Service', 'touch 10$', 14000, 0, '2019-04-01', '', 0),
(11, 3, 'Stock', 'tttttt', 12000, 0, '2019-04-01', '', 0),
(12, 5, 'Service', 'alfa 1 month', 40000, 0, '2019-04-01', '', 0),
(13, 2, 'Stock', 'laptop', 120000, 0, '2019-04-01', '', 0),
(14, 1, 'Service', 'touch 10$', 14000, 0, '2019-04-01', '', 0),
(15, 2, 'Stock', 'laptop', 120000, 0, '2019-04-01', '', 0),
(16, 5, 'Service', 'alfa 1 month', 40000, 0, '2019-04-01', '', 0),
(17, 5, 'Service', 'steam 50$', 80000, 0, '2019-04-01', '', 0),
(18, 5, 'Stock', 'laptop', 120000, 0, '2019-04-01', '', 0),
(19, 5, 'Stock', 'tttttt', 12000, 0, '2019-04-01', '', 0),
(20, 2, 'Service', 'touch 10$', 14000, 0, '2019-04-01', '', 0),
(21, 3, 'Service', 'alfa 1 month', 40000, 0, '2019-04-01', '', 0),
(22, 2, 'Service', 'touch 10$', 14000, 0, '2019-04-01', '', 0),
(23, 3, 'Service', 'alfa 1 month', 40000, 0, '2019-04-01', '', 0),
(24, 2, 'Service', 'touch 10$', 14000, 0, '2019-04-01', '', 0),
(25, 1, 'Service', 'steam 10$', 20000, 0, '2019-04-01', '', 0),
(26, 2, 'Stock', 'tttttt', 12000, 0, '2019-04-01', '', 0),
(27, 3, 'Service', 'alfa 1 month', 40000, 0, '2019-04-01', '', 0),
(28, 7, 'Stock', 'printer', 60000, 55000, '2019-04-16', '', 1),
(29, 2, 'Service', 'alfa 1 month', 40000, 0, '2019-05-08', '', 0),
(30, 2, 'Service', 'steam 50$', 80000, 0, '2019-07-10', '', 0),
(31, 2, 'Service', 'alfa 1 month', 40000, 0, '2019-07-25', '', 0),
(32, 2, 'Stock', 'Lazer Jet Pro Printer HP', 60000, 0, '2019-07-25', '', 0),
(33, 2, 'Stock', 'hp toner 139 black', 25000, 0, '2019-07-25', '', 0),
(34, 2, 'Stock', 'Laptop Toshiba', 120000, 0, '2019-08-11', '', 0),
(35, 8, 'Service', 'alfa 1 month', 40000, 0, '2019-08-23', '', 0),
(36, 2, 'Stock', 'iPhone charger', 12000, 0, '2019-08-23', '', 0),
(37, 4, 'Stock', 'Laptop Toshiba', 120000, 120000, '2019-09-02', '', 1),
(38, 1, 'Service', 'alfa 1 month', 40000, 0, '2019-09-02', '', 0),
(39, 1, 'Service', 'steam 50$', 80000, 80000, '2019-11-24', '', 1),
(40, 2, 'Stock', 'TP-Link Router', 30000, 28000, '2019-11-26', '', 1),
(41, 3, 'Service', 'steam 100$', 160000, 160000, '2019-11-26', '', 1),
(42, 6, 'Service', 'steam 50$', 80000, 80000, '2019-11-26', '', 1),
(43, 1, 'Stock', 'iPhone XS Max Cover', 45000, 45000, '2019-11-26', '', 1),
(44, 6, 'Stock', 'iPhone charger', 12000, 12000, '2019-11-26', '', 1),
(45, 2, 'Service', 'alfa 1 monthssss', 40000, 40000, '2019-12-08', '', 1),
(46, 1, 'Service', 'alfa 1 monthssss', 40000, 40000, '2019-12-15', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `debts_payments`
--

CREATE TABLE `debts_payments` (
  `payment_ID` int(11) NOT NULL,
  `debt_ID_FK` int(11) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_time` time DEFAULT NULL,
  `payment_amount` int(10) NOT NULL,
  `payment_notes` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `debts_payments`
--

INSERT INTO `debts_payments` (`payment_ID`, `debt_ID_FK`, `payment_date`, `payment_time`, `payment_amount`, `payment_notes`) VALUES
(1, 1, '2019-03-20', NULL, 4000, NULL),
(2, 1, '2019-04-01', NULL, 10000, NULL),
(3, 3, '2019-04-01', NULL, 5000, NULL),
(4, 3, '2019-04-01', NULL, 5000, NULL),
(5, 3, '2019-04-01', NULL, 25000, NULL),
(6, 2, '2019-04-01', NULL, 60000, NULL),
(7, 4, '2019-04-01', NULL, 30000, NULL),
(8, 5, '2019-04-01', NULL, 40000, NULL),
(9, 4, '2019-04-01', NULL, 30000, NULL),
(10, 2, '2019-04-01', NULL, 60000, NULL),
(11, 6, '2019-04-01', NULL, 40000, NULL),
(12, 7, '2019-04-01', NULL, 12000, NULL),
(13, 8, '2019-04-01', NULL, 60000, NULL),
(14, 9, '2019-04-01', NULL, 6000, NULL),
(15, 9, '2019-04-01', NULL, 6000, NULL),
(16, 10, '2019-04-01', NULL, 6000, NULL),
(17, 10, '2019-04-01', NULL, 8000, NULL),
(18, 11, '2019-04-01', NULL, 12000, NULL),
(19, 12, '2019-04-01', NULL, 40000, NULL),
(20, 13, '2019-04-01', NULL, 60000, NULL),
(21, 13, '2019-04-01', NULL, 60000, NULL),
(22, 14, '2019-04-01', NULL, 14000, NULL),
(23, 15, '2019-04-01', NULL, 120000, NULL),
(24, 16, '2019-04-01', NULL, 40000, NULL),
(25, 17, '2019-04-01', NULL, 80000, NULL),
(26, 18, '2019-04-01', NULL, 60000, NULL),
(27, 18, '2019-04-01', NULL, 60000, NULL),
(28, 19, '2019-04-01', NULL, 2000, NULL),
(29, 19, '2019-04-01', NULL, 10000, NULL),
(30, 20, '2019-04-01', NULL, 4000, NULL),
(31, 20, '2019-04-01', NULL, 10000, NULL),
(32, 21, '2019-04-01', NULL, 40000, NULL),
(33, 22, '2019-04-01', NULL, 4000, NULL),
(34, 22, '2019-04-01', NULL, 10000, NULL),
(35, 23, '2019-04-01', NULL, 5000, NULL),
(36, 23, '2019-04-01', NULL, 35000, NULL),
(37, 24, '2019-04-01', NULL, 5000, NULL),
(38, 24, '2019-04-01', NULL, 9000, NULL),
(39, 25, '2019-04-01', NULL, 10000, NULL),
(40, 25, '2019-04-01', NULL, 10000, NULL),
(41, 27, '2019-04-01', NULL, 5000, NULL),
(42, 27, '2019-04-01', NULL, 35000, NULL),
(43, 26, '2019-04-01', NULL, 12000, NULL),
(44, 28, '2019-05-08', NULL, 5000, NULL),
(45, 29, '2019-05-08', NULL, 10000, NULL),
(46, 30, '2019-07-10', NULL, 40000, NULL),
(47, 30, '2019-07-10', NULL, 5000, NULL),
(48, 30, '2019-07-10', NULL, 35000, NULL),
(49, 29, '2019-07-25', NULL, 30000, NULL),
(50, 32, '2019-07-25', NULL, 60000, NULL),
(51, 34, '2019-08-11', NULL, 60000, NULL),
(52, 34, '2019-08-11', NULL, 50000, NULL),
(53, 33, '2019-08-11', NULL, 25000, NULL),
(54, 34, '2019-08-11', NULL, 10000, NULL),
(55, 35, '2019-08-23', NULL, 40000, NULL),
(56, 36, '2019-08-23', NULL, 12000, NULL),
(57, 38, '2019-10-02', NULL, 40000, NULL),
(58, 31, '2019-12-06', NULL, 20000, NULL),
(59, 31, '2019-12-06', NULL, 20000, NULL),
(60, 40, '2019-12-06', NULL, 2000, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `inv_ID` int(100) NOT NULL,
  `customer_ID_FK` int(10) DEFAULT NULL,
  `inv_date` date NOT NULL,
  `inv_time` time NOT NULL,
  `inv_total_cost` float NOT NULL,
  `inv_total_price` float NOT NULL,
  `dollar_exchange` float DEFAULT NULL,
  `invoice_details` json DEFAULT NULL,
  `inv_status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`inv_ID`, `customer_ID_FK`, `inv_date`, `inv_time`, `inv_total_cost`, `inv_total_price`, `dollar_exchange`, `invoice_details`, `inv_status`) VALUES
(1, NULL, '2019-01-01', '04:17:50', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 1, \"item_cost\": 5000, \"item_name\": \"test test\", \"item_price\": 12000}]', 1),
(2, NULL, '2019-01-27', '01:32:42', 10000, 24000, NULL, '[{\"qty\": 1, \"item_ID\": 1, \"item_cost\": 5000, \"item_name\": \"test test\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 1, \"item_cost\": 5000, \"item_name\": \"test test\", \"item_price\": 12000}]', 1),
(3, NULL, '2019-01-27', '22:09:54', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 1, \"item_cost\": 5000, \"item_name\": \"test test\", \"item_price\": 12000}]', 1),
(4, NULL, '2019-01-28', '12:27:40', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(5, NULL, '2019-01-29', '15:44:51', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(6, NULL, '2019-01-16', '15:45:59', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(7, NULL, '2019-01-10', '16:07:03', 40000, 55000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 20000}]', 1),
(8, NULL, '2019-01-02', '00:00:00', 88000, 110000, NULL, '[]', 1),
(9, NULL, '2019-01-03', '00:00:00', 190000, 240000, NULL, '[]', 1),
(10, NULL, '2019-01-04', '00:00:00', 45000, 60000, NULL, '[]', 1),
(11, NULL, '2019-01-05', '00:00:00', 70000, 150000, NULL, '[]', 1),
(12, NULL, '2019-01-06', '00:00:00', 99000, 165000, NULL, '[]', 1),
(13, NULL, '2019-01-07', '00:00:00', 45000, 87000, NULL, '[]', 1),
(14, NULL, '2019-01-08', '00:00:00', 12000, 33000, NULL, '[]', 1),
(15, NULL, '2019-01-09', '00:00:00', 29000, 49000, NULL, '[]', 1),
(16, NULL, '2019-01-11', '00:00:00', 66000, 100000, NULL, '[]', 1),
(17, NULL, '2019-01-12', '00:00:00', 77000, 105000, NULL, '[]', 1),
(18, NULL, '2019-01-13', '00:00:00', 130000, 190000, NULL, '[]', 1),
(19, NULL, '2019-01-14', '00:00:00', 90000, 130000, NULL, '[]', 1),
(20, NULL, '2019-01-15', '00:00:00', 40000, 60000, NULL, '[]', 1),
(21, NULL, '2019-01-16', '00:00:00', 5000, 9000, NULL, '[]', 1),
(22, NULL, '2019-01-17', '00:00:00', 110000, 140000, NULL, '[]', 1),
(23, NULL, '2019-01-29', '18:27:51', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(24, NULL, '2019-01-18', '00:00:00', 60000, 90000, NULL, '[]', 1),
(25, NULL, '2019-01-19', '00:00:00', 29000, 40000, NULL, '[]', 1),
(26, NULL, '2019-01-20', '00:00:00', 78000, 101000, NULL, '[]', 1),
(27, NULL, '2019-01-21', '00:00:00', 105000, 151000, NULL, '[]', 1),
(28, NULL, '2019-01-22', '00:00:00', 49000, 71000, NULL, '[]', 1),
(29, NULL, '2019-01-23', '00:00:00', 9000, 16000, NULL, '[]', 1),
(30, NULL, '2019-01-24', '00:00:00', 12000, 20000, NULL, '[]', 1),
(31, NULL, '2019-01-25', '00:00:00', 21000, 32000, NULL, '[]', 1),
(32, NULL, '2019-01-26', '00:00:00', 50000, 62000, NULL, '[]', 1),
(33, NULL, '2019-01-30', '00:37:57', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(34, NULL, '2019-02-08', '05:47:47', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(35, NULL, '2019-02-08', '20:44:05', 85000, 132000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(36, NULL, '2019-02-09', '16:43:50', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(37, NULL, '2019-02-11', '03:09:56', 10000, 24000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(38, NULL, '2019-02-21', '17:04:36', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(39, NULL, '2019-03-05', '12:41:48', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(40, NULL, '2019-04-26', '18:06:30', 20000, 30000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(41, NULL, '2019-04-26', '18:06:47', 12000, 23000, NULL, '[{\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 23000}]', 1),
(42, NULL, '2019-04-28', '00:32:31', 240000, 360000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(43, NULL, '2019-04-28', '00:32:52', 1, 2000, NULL, '[{\"qty\": 1, \"item_ID\": 9, \"item_cost\": 5000, \"item_name\": \"USB for Samsung\", \"item_price\": 2000}]', 1),
(44, NULL, '2019-04-28', '00:32:59', 20000, 30000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(45, NULL, '2019-04-28', '00:33:13', 12000, 25000, NULL, '[{\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(46, NULL, '2019-04-28', '00:33:41', 20000, 30000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(47, NULL, '2019-04-28', '13:42:45', 20000, 30000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(48, NULL, '2019-04-29', '23:59:58', 12000, 25000, NULL, '[{\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(49, NULL, '2019-04-30', '17:08:21', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(50, NULL, '2019-04-30', '17:10:05', 1, 2000, NULL, '[{\"qty\": 1, \"item_ID\": 9, \"item_cost\": 5000, \"item_name\": \"USB for Samsung\", \"item_price\": 2000}]', 1),
(51, NULL, '2019-04-30', '17:10:19', 1, 3000, NULL, '[{\"qty\": 1, \"item_ID\": 10, \"item_cost\": 50000, \"item_name\": \"Laptop Battery\", \"item_price\": 3000}]', 1),
(52, NULL, '2019-04-30', '17:11:01', 85000, 132000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(53, NULL, '2019-04-30', '17:29:36', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 9, \"item_cost\": 5000, \"item_name\": \"USB for Samsung\", \"item_price\": 12000}]', 1),
(54, NULL, '2019-04-30', '17:29:52', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 9, \"item_cost\": 5000, \"item_name\": \"USB for Samsung\", \"item_price\": 12000}]', 1),
(55, NULL, '2019-04-30', '17:53:53', 40000, 50000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 50000}]', 1),
(56, NULL, '2019-04-30', '17:54:29', 40000, 60003, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60003}]', 1),
(57, NULL, '2019-05-01', '02:11:30', 2000, 5000, NULL, '[{\"qty\": 1, \"item_ID\": 8, \"item_cost\": 2000, \"item_name\": \"HDMI Cable\", \"item_price\": 5000}]', 1),
(58, NULL, '2019-05-10', '22:34:16', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(59, NULL, '2019-05-11', '02:59:08', 2000, 5000, NULL, '[{\"qty\": 1, \"item_ID\": 8, \"item_cost\": 2000, \"item_name\": \"HDMI Cable\", \"item_price\": 5000}]', 1),
(60, NULL, '2019-05-11', '04:26:59', 95000, 162000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 10, \"item_cost\": 50000, \"item_name\": \"Laptop Battery\", \"item_price\": 90000}, {\"qty\": 1, \"item_ID\": 9, \"item_cost\": 5000, \"item_name\": \"USB for Samsung\", \"item_price\": 12000}]', 1),
(61, NULL, '2019-07-02', '17:41:47', 12000, 25000, NULL, '[{\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(62, NULL, '2019-07-10', '16:53:25', 90000, 144000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(63, NULL, '2019-07-11', '11:38:11', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(64, NULL, '2019-08-11', '15:23:11', 17000, 37000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(65, NULL, '2019-08-13', '18:53:15', 42000, 65000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 8, \"item_cost\": 2000, \"item_name\": \"HDMI Cable\", \"item_price\": 5000}]', 1),
(66, NULL, '2019-08-14', '00:16:12', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(67, NULL, '2019-08-14', '00:16:47', 125000, 192000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(68, NULL, '2019-08-14', '00:17:40', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(69, NULL, '2019-08-23', '22:28:34', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(70, NULL, '2019-08-23', '22:28:45', 15000, 36000, NULL, '[{\"qty\": 3, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(71, NULL, '2019-08-24', '22:21:51', 46000, 85000, NULL, '[{\"qty\": 1, \"item_ID\": 8, \"item_cost\": 2000, \"item_name\": \"HDMI Cable\", \"item_price\": 5000}, {\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}, {\"qty\": 2, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(72, NULL, '2019-08-26', '21:19:56', 30000, 72000, NULL, '[{\"qty\": 6, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(73, NULL, '2019-08-26', '21:26:05', 645000, 972000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 8, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(74, NULL, '2019-08-30', '22:59:10', 104000, 174000, NULL, '[{\"qty\": 2, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}, {\"qty\": 1, \"item_ID\": 8, \"item_cost\": 2000, \"item_name\": \"HDMI Cable\", \"item_price\": 5000}]', 1),
(75, NULL, '2019-08-31', '16:15:58', 90000, 144000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 2, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(76, NULL, '2019-09-01', '18:09:05', 125000, 192000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(77, NULL, '2019-09-30', '17:10:16', 77000, 135000, NULL, '[{\"qty\": 5, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 10000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(78, NULL, '2019-09-30', '17:24:41', 5000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(79, NULL, '2019-09-30', '17:26:17', 99000, 162000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}, {\"qty\": 1, \"item_ID\": 8, \"item_cost\": 2000, \"item_name\": \"HDMI Cable\", \"item_price\": 5000}]', 1),
(80, NULL, '2019-09-30', '18:47:01', 5000, 45000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 45000}]', 1),
(81, NULL, '2019-10-02', '19:06:32', 40, 60, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 40, \"item_name\": \"Laptop Toshiba\", \"item_price\": 60}]', 1),
(82, NULL, '2019-10-02', '19:07:22', 40, 60, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 40, \"item_name\": \"Laptop Toshiba\", \"item_price\": 60}]', 1),
(83, NULL, '2019-10-06', '20:45:12', 210000, 324000, NULL, '[{\"qty\": 2, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 2, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(84, NULL, '2019-10-11', '01:31:57', 74000, 140000, NULL, '[{\"qty\": 2, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}, {\"qty\": 1, \"item_ID\": 10, \"item_cost\": 50000, \"item_name\": \"Laptop Battery\", \"item_price\": 90000}]', 1),
(85, NULL, '2019-10-16', '22:18:43', 70000, 110000, NULL, '[{\"qty\": 2, \"item_ID\": 2, \"item_cost\": 5000, \"item_name\": \"iPhone charger\", \"item_price\": 10000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(86, NULL, '2019-11-19', '04:49:21', 92000, 144000, NULL, '[{\"qty\": 2, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(87, NULL, '2019-11-19', '20:50:08', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(88, NULL, '2019-11-24', '20:19:45', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(89, NULL, '2019-11-24', '20:22:14', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(90, NULL, '2019-11-26', '01:40:23', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(91, NULL, '2019-11-26', '01:41:51', 168000, 277000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}, {\"qty\": 1, \"item_ID\": 10, \"item_cost\": 50000, \"item_name\": \"Laptop Battery\", \"item_price\": 90000}, {\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(92, NULL, '2019-11-26', '01:42:11', 92000, 145000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(93, NULL, '2019-11-26', '06:44:12', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(94, NULL, '2019-11-26', '10:06:18', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(95, NULL, '2019-12-04', '17:10:14', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(96, NULL, '2019-12-04', '17:10:21', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(97, NULL, '2019-12-04', '17:21:41', 12000, 25000, NULL, '[{\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(98, NULL, '2019-12-04', '17:22:09', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(99, NULL, '2019-12-04', '18:02:22', 20000, 30000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(100, NULL, '2019-12-04', '22:33:26', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(101, NULL, '2019-12-04', '22:34:02', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(102, NULL, '2019-12-04', '22:35:07', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(103, NULL, '2019-12-04', '22:35:18', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(104, NULL, '2019-12-04', '22:35:29', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(105, NULL, '2019-12-04', '22:35:49', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(106, NULL, '2019-12-04', '22:35:58', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(107, NULL, '2019-12-04', '22:41:27', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(108, NULL, '2019-12-04', '22:41:35', 12000, 25000, NULL, '[{\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(109, NULL, '2019-12-04', '22:47:37', 100000, 150000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}, {\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(110, NULL, '2019-12-05', '17:53:54', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(111, NULL, '2019-12-05', '17:54:30', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(112, NULL, '2019-12-07', '12:53:15', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(113, NULL, '2019-12-08', '18:40:18', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(114, NULL, '2019-12-08', '18:43:06', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(115, NULL, '2019-12-08', '18:55:50', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(116, NULL, '2019-12-08', '18:56:44', 280000, 420000, NULL, '[{\"qty\": 7, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(117, NULL, '2019-12-08', '18:57:43', 560000, 840000, NULL, '[{\"qty\": 7, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(118, NULL, '2019-12-08', '18:58:10', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(119, NULL, '2019-12-08', '18:59:05', 500, 3000, NULL, '[{\"qty\": 1, \"item_ID\": 12, \"item_cost\": 500, \"item_name\": \"almost theres\", \"item_price\": 3000}]', 1),
(120, NULL, '2019-12-08', '19:05:13', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(121, NULL, '2019-12-08', '19:06:16', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(122, NULL, '2019-12-08', '19:08:11', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(123, NULL, '2019-12-08', '19:08:39', 100000, 180000, NULL, '[{\"qty\": 2, \"item_ID\": 10, \"item_cost\": 50000, \"item_name\": \"Laptop Battery\", \"item_price\": 90000}]', 1),
(124, NULL, '2019-12-10', '17:17:18', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(125, NULL, '2019-12-10', '17:20:27', 73000, 124000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}, {\"qty\": 1, \"item_ID\": 9, \"item_cost\": 5000, \"item_name\": \"USB for Samsung\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 14, \"item_cost\": 30000, \"item_name\": \"iPhone XS Max Cover\", \"item_price\": 45000}, {\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(126, NULL, '2019-12-15', '13:56:27', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(127, NULL, '2019-12-15', '13:58:30', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(128, NULL, '2019-12-15', '13:59:38', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(129, NULL, '2019-12-15', '15:16:38', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(130, NULL, '2019-12-15', '15:19:06', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(131, NULL, '2019-12-15', '15:20:48', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(132, NULL, '2019-12-15', '15:21:20', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(133, NULL, '2019-12-15', '15:44:01', 27000, 47000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 8, \"item_cost\": 2000, \"item_name\": \"HDMI Cable\", \"item_price\": 5000}, {\"qty\": 1, \"item_ID\": 9, \"item_cost\": 5000, \"item_name\": \"USB for Samsung\", \"item_price\": 12000}]', 1),
(134, NULL, '2019-12-15', '15:46:19', 44000, 68000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 18, \"item_cost\": 4000, \"item_name\": \"fixed\", \"item_price\": 8000}]', 1),
(135, NULL, '2019-12-15', '15:48:22', 18000, 37000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(136, NULL, '2019-12-15', '15:53:00', 10000, 20000, NULL, '[]', 1),
(137, NULL, '2019-12-15', '15:53:00', 13000, 20000, NULL, '[]', 1),
(138, NULL, '2019-12-15', '15:55:34', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(139, NULL, '2019-12-15', '15:56:16', 20000, 30000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(140, NULL, '2019-12-15', '15:56:28', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(141, NULL, '2019-12-15', '16:03:38', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(142, 3, '2019-12-15', '16:03:46', 20000, 30000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(143, NULL, '2019-12-15', '16:41:05', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(144, NULL, '2019-12-15', '16:44:54', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(145, 1, '2019-12-15', '17:04:09', 20000, 30000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}]', 1),
(146, 6, '2019-12-15', '17:09:24', 2000, 5000, NULL, '[{\"qty\": 1, \"item_ID\": 8, \"item_cost\": 2000, \"item_name\": \"HDMI Cable\", \"item_price\": 5000}]', 1),
(147, NULL, '2019-12-15', '18:28:17', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(148, NULL, '2019-12-15', '18:39:41', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(149, NULL, '2019-12-15', '19:02:44', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(150, 2, '2019-12-15', '19:03:15', 40000, 60000, NULL, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 40000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 60000}]', 1),
(151, NULL, '2019-12-15', '19:04:06', 80000, 120000, NULL, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(152, NULL, '2019-12-15', '19:04:15', 60000, 100000, NULL, '[{\"qty\": 1, \"item_ID\": 15, \"item_cost\": 60000, \"item_name\": \"testhahah\", \"item_price\": 100000}]', 1),
(153, 2, '2019-12-15', '23:06:53', 100000, 150000, NULL, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 80000, \"item_name\": \"Laptop Toshiba\", \"item_price\": 120000}]', 1),
(154, 1, '2019-12-15', '23:11:40', 42000, 70000, NULL, '[{\"qty\": 1, \"item_ID\": 14, \"item_cost\": 30000, \"item_name\": \"iPhone XS Max Cover\", \"item_price\": 45000}, {\"qty\": 1, \"item_ID\": 5, \"item_cost\": 12000, \"item_name\": \"hp toner 139 black\", \"item_price\": 25000}]', 1),
(155, 3, '2019-12-15', '23:15:49', 4000, 8000, NULL, '[{\"qty\": 1, \"item_ID\": 18, \"item_cost\": 4000, \"item_name\": \"fixed\", \"item_price\": 8000}]', 1),
(156, 2, '2019-12-15', '23:17:01', 6000, 12000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}]', 1),
(157, NULL, '2019-12-30', '00:03:03', 31000, 54000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 6000, \"item_name\": \"iPhone charger\", \"item_price\": 12000}, {\"qty\": 1, \"item_ID\": 6, \"item_cost\": 20000, \"item_name\": \"TP-Link Router\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 9, \"item_cost\": 5000, \"item_name\": \"USB for Samsung\", \"item_price\": 12000}]', 1),
(158, NULL, '2020-04-09', '19:32:24', 25000, 46000, NULL, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 4, \"item_name\": \"iPhone charger\", \"item_price\": 8}, {\"qty\": 1, \"item_ID\": 9, \"item_cost\": 3, \"item_name\": \"USB for Samsung\", \"item_price\": 8}, {\"qty\": 1, \"item_ID\": 6, \"item_cost\": 13, \"item_name\": \"TP-Link Router\", \"item_price\": 20}, {\"qty\": 1, \"item_ID\": 16, \"item_cost\": 4, \"item_name\": \"teast\", \"item_price\": 8}, {\"qty\": 1, \"item_ID\": 19, \"item_cost\": 1, \"item_name\": \"blabla\", \"item_price\": 2}]', 1),
(159, NULL, '2020-04-10', '21:57:19', 12000, 24000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 4, \"item_name\": \"iPhone charger\", \"item_price\": 8}]', 1),
(160, NULL, '2020-04-10', '22:08:38', 12000, 24000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 4, \"item_name\": \"iPhone charger\", \"item_price\": 8}]', 1),
(161, NULL, '2020-04-12', '14:48:09', 12000, 24000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 4, \"item_name\": \"iPhone charger\", \"item_price\": 8}]', 1),
(162, NULL, '2020-04-12', '14:48:45', 48000, 96000, 3000, '[{\"qty\": 4, \"item_ID\": 2, \"item_cost\": 4, \"item_name\": \"iPhone charger\", \"item_price\": 8}]', 1),
(163, NULL, '2020-04-12', '14:49:17', 12000, 16000, 3000, '[]', 1),
(164, NULL, '2020-04-12', '14:59:17', 36000, 45000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 15000}]', 1),
(165, NULL, '2020-04-12', '15:00:33', 12000, 15000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 15000}]', 1),
(166, NULL, '2020-04-12', '15:02:10', 321000, 400000, 3000, '[{\"qty\": 2, \"item_ID\": 3, \"item_cost\": 160500, \"item_name\": \"Laptop Toshiba\", \"item_price\": 200000}]', 1),
(167, NULL, '2020-04-12', '15:22:34', 155150, 232000, 2900, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 155150, \"item_name\": \"Laptop Toshiba\", \"item_price\": 232000}]', 1),
(168, 5, '2020-04-13', '22:48:39', 11600, 23200, 2900, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 11600, \"item_name\": \"iPhone charger\", \"item_price\": 23200}]', 1),
(169, NULL, '2020-04-13', '22:53:29', 155150, 232000, 2900, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 155150, \"item_name\": \"Laptop Toshiba\", \"item_price\": 232000}]', 1),
(170, 2, '2020-04-13', '23:04:20', 11600, 23200, 2900, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 11600, \"item_name\": \"iPhone charger\", \"item_price\": 23200}]', 1),
(171, 6, '2020-04-13', '23:05:14', 11600, 23200, 2900, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 11600, \"item_name\": \"iPhone charger\", \"item_price\": 23200}]', 1),
(172, 1, '2020-04-13', '23:54:08', 12000, 24000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 24000}]', 1),
(173, NULL, '2020-04-21', '21:55:00', 78000, 120000, 3000, '[{\"qty\": 1, \"item_ID\": 4, \"item_cost\": 78000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 120000}]', 1),
(174, NULL, '2020-04-21', '22:33:14', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(175, 2, '2020-04-22', '21:42:53', 15000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 8, \"item_cost\": 15000, \"item_name\": \"HDMI Cable\", \"item_price\": 30000}]', 1),
(176, 2, '2020-04-22', '21:43:48', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(177, NULL, '2020-05-07', '19:29:38', 98000, 145000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 34, \"item_cost\": 80000, \"item_name\": \"1\", \"item_price\": 100000}, {\"qty\": 1, \"item_ID\": 35, \"item_cost\": 6000, \"item_name\": \"aj;lskfjas;lkdjflkjsd\", \"item_price\": 15000}]', 1),
(178, NULL, '2020-05-07', '19:32:52', 92000, 130000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 34, \"item_cost\": 80000, \"item_name\": \"1\", \"item_price\": 100000}]', 1),
(179, NULL, '2020-05-07', '19:36:16', 92000, 130000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 34, \"item_cost\": 80000, \"item_name\": \"1\", \"item_price\": 100000}]', 1),
(180, NULL, '2020-05-07', '19:37:00', 92000, 130000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 34, \"item_cost\": 80000, \"item_name\": \"1\", \"item_price\": 100000}]', 1),
(181, NULL, '2020-05-07', '19:42:09', 92000, 130000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 34, \"item_cost\": 80000, \"item_name\": \"1\", \"item_price\": 100000}]', 1),
(182, NULL, '2020-05-07', '19:47:35', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(183, NULL, '2020-05-07', '19:47:53', 80000, 100000, 3000, '[{\"qty\": 1, \"item_ID\": 34, \"item_cost\": 80000, \"item_name\": \"1\", \"item_price\": 100000}]', 1),
(184, NULL, '2020-05-07', '19:48:02', 92000, 130000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 34, \"item_cost\": 80000, \"item_name\": \"1\", \"item_price\": 100000}]', 1),
(185, NULL, '2020-05-07', '19:48:24', 172500, 270000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 160500, \"item_name\": \"Laptop Toshiba\", \"item_price\": 240000}]', 1),
(186, NULL, '2020-05-07', '19:49:45', 104000, 160000, 3000, '[{\"qty\": 2, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 34, \"item_cost\": 80000, \"item_name\": \"1\", \"item_price\": 100000}]', 1),
(187, NULL, '2020-05-07', '19:50:45', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(188, NULL, '2020-05-07', '19:51:27', 24000, 60000, 3000, '[{\"qty\": 2, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(189, NULL, '2020-05-07', '19:51:43', 90000, 150000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 78000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 120000}]', 1),
(190, NULL, '2020-05-07', '19:53:00', 90000, 150000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 78000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 120000}]', 1),
(191, NULL, '2020-05-07', '20:28:54', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(192, NULL, '2020-05-07', '20:51:05', 250500, 390000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}, {\"qty\": 1, \"item_ID\": 3, \"item_cost\": 160500, \"item_name\": \"Laptop Toshiba\", \"item_price\": 240000}, {\"qty\": 1, \"item_ID\": 4, \"item_cost\": 78000, \"item_name\": \"Lazer Jet Pro Printer HP\", \"item_price\": 120000}]', 1),
(193, NULL, '2020-05-07', '20:51:12', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(194, NULL, '2020-05-07', '21:29:45', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(195, 2, '2020-05-07', '21:29:54', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(197, NULL, '2020-08-21', '16:22:38', 160500, 240000, 3000, '[{\"qty\": 1, \"item_ID\": 3, \"item_cost\": 160500, \"item_name\": \"Laptop Toshiba\", \"item_price\": 240000}]', 0),
(198, NULL, '2020-08-21', '17:21:07', 48000, 84000, 3000, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 39000, \"item_name\": \"TP-Link Router\", \"item_price\": 60000}, {\"qty\": 1, \"item_ID\": 9, \"item_cost\": 9000, \"item_name\": \"USB for Samsung\", \"item_price\": 24000}]', 0),
(199, NULL, '2020-08-30', '13:00:58', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 1),
(200, NULL, '2020-08-30', '13:20:09', 4, 10, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 4, \"item_name\": \"iPhone charger\", \"item_price\": 10}]', 0),
(201, NULL, '2020-08-30', '13:20:27', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 0),
(202, NULL, '2020-08-30', '18:26:06', 24000, 48000, 3000, '[{\"qty\": 1, \"item_ID\": 5, \"item_cost\": 24000, \"item_name\": \"hp toner 139 black\", \"item_price\": 48000}]', 0),
(203, NULL, '2020-08-30', '18:36:01', 9000, 24000, 3000, '[{\"qty\": 1, \"item_ID\": 9, \"item_cost\": 9000, \"item_name\": \"USB for Samsung\", \"item_price\": 24000}]', 1),
(204, NULL, '2020-08-30', '18:36:09', 72000, 120000, 3000, '[{\"qty\": 1, \"item_ID\": 14, \"item_cost\": 60000, \"item_name\": \"iPhone XS Max Cover\", \"item_price\": 90000}, {\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 0),
(205, NULL, '2020-11-13', '21:07:05', 39000, 60000, 3000, '[{\"qty\": 1, \"item_ID\": 6, \"item_cost\": 39000, \"item_name\": \"TP-Link Router\", \"item_price\": 60000}]', 1),
(206, 3, '2020-11-28', '20:52:51', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 0),
(207, 3, '2020-11-28', '20:53:36', 12000, 30000, 3000, '[{\"qty\": 1, \"item_ID\": 2, \"item_cost\": 12000, \"item_name\": \"iPhone charger\", \"item_price\": 30000}]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_details`
--

CREATE TABLE `invoice_details` (
  `inv_det_ID` int(100) NOT NULL,
  `inv_id` int(100) NOT NULL,
  `inv_det_IID` int(10) NOT NULL,
  `inv_det_quantity` int(10) NOT NULL,
  `inv_det_cost` int(10) NOT NULL,
  `inv_det_price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `invoice_details`
--

INSERT INTO `invoice_details` (`inv_det_ID`, `inv_id`, `inv_det_IID`, `inv_det_quantity`, `inv_det_cost`, `inv_det_price`) VALUES
(1, 1, 1, 1, 5000, 12000),
(2, 2, 1, 1, 5000, 12000),
(3, 2, 1, 1, 5000, 12000),
(4, 3, 1, 1, 5000, 12000),
(5, 4, 2, 1, 5000, 12000),
(6, 5, 3, 1, 80000, 120000),
(7, 6, 4, 1, 40000, 60000),
(8, 7, 4, 1, 40000, 20000),
(9, 23, 2, 1, 5000, 12000),
(10, 33, 4, 1, 40000, 60000),
(11, 34, 3, 1, 80000, 120000),
(12, 35, 2, 1, 5000, 12000),
(13, 35, 3, 1, 80000, 120000),
(14, 36, 2, 1, 5000, 12000),
(15, 37, 2, 1, 5000, 12000),
(16, 37, 2, 1, 5000, 12000),
(17, 38, 3, 1, 80000, 120000),
(18, 39, 3, 1, 80000, 120000),
(19, 40, 6, 1, 20000, 30000),
(20, 41, 5, 1, 12000, 23000),
(21, 42, 4, 1, 40000, 60000),
(22, 42, 3, 1, 80000, 120000),
(23, 42, 4, 1, 40000, 60000),
(24, 42, 3, 1, 80000, 120000),
(25, 43, 9, 1, 5000, 2000),
(26, 44, 6, 1, 20000, 30000),
(27, 45, 5, 1, 12000, 25000),
(28, 46, 6, 1, 20000, 30000),
(29, 47, 6, 1, 20000, 30000),
(30, 48, 5, 1, 12000, 25000),
(31, 49, 4, 1, 40000, 60000),
(32, 50, 9, 1, 5000, 2000),
(33, 51, 10, 1, 50000, 3000),
(34, 52, 4, 1, 40000, 60000),
(35, 52, 2, 1, 5000, 12000),
(36, 52, 4, 1, 40000, 60000),
(37, 53, 9, 1, 5000, 12000),
(38, 54, 9, 1, 5000, 12000),
(39, 55, 4, 1, 40000, 50000),
(40, 56, 4, 1, 40000, 60003),
(41, 57, 8, 1, 2000, 5000),
(42, 58, 2, 1, 5000, 12000),
(43, 59, 8, 1, 2000, 5000),
(44, 60, 4, 1, 40000, 60000),
(45, 60, 10, 1, 50000, 90000),
(46, 60, 9, 1, 5000, 12000),
(47, 61, 5, 1, 12000, 25000),
(48, 62, 2, 1, 5000, 12000),
(49, 62, 2, 1, 5000, 12000),
(50, 62, 3, 1, 80000, 120000),
(51, 63, 3, 1, 80000, 120000),
(52, 64, 2, 1, 5000, 12000),
(53, 64, 5, 1, 12000, 25000),
(54, 65, 4, 1, 40000, 60000),
(55, 65, 8, 1, 2000, 5000),
(56, 66, 2, 1, 5000, 12000),
(57, 67, 3, 1, 80000, 120000),
(58, 67, 2, 1, 5000, 12000),
(59, 67, 4, 1, 40000, 60000),
(60, 68, 3, 1, 80000, 120000),
(61, 69, 2, 1, 5000, 12000),
(62, 70, 2, 3, 5000, 12000),
(63, 71, 8, 1, 2000, 5000),
(64, 71, 6, 1, 20000, 30000),
(65, 71, 5, 2, 12000, 25000),
(66, 72, 2, 6, 5000, 12000),
(67, 73, 2, 1, 5000, 12000),
(68, 73, 3, 8, 80000, 120000),
(69, 74, 2, 2, 5000, 12000),
(70, 74, 3, 1, 80000, 120000),
(71, 74, 5, 1, 12000, 25000),
(72, 74, 8, 1, 2000, 5000),
(73, 75, 3, 1, 80000, 120000),
(74, 75, 2, 2, 5000, 12000),
(75, 76, 2, 1, 5000, 12000),
(76, 76, 3, 1, 80000, 120000),
(77, 76, 4, 1, 40000, 60000),
(78, 77, 2, 5, 5000, 10000),
(79, 77, 4, 1, 40000, 60000),
(80, 77, 5, 1, 12000, 25000),
(81, 78, 2, 1, 5000, 12000),
(82, 79, 3, 1, 80000, 120000),
(83, 79, 2, 1, 5000, 12000),
(84, 79, 5, 1, 12000, 25000),
(85, 79, 8, 1, 2000, 5000),
(86, 80, 2, 1, 5000, 45000),
(87, 81, 3, 1, 40, 60),
(88, 82, 3, 1, 40, 60),
(89, 83, 2, 2, 5000, 12000),
(90, 83, 3, 2, 80000, 120000),
(91, 83, 4, 1, 40000, 60000),
(92, 84, 5, 2, 12000, 25000),
(93, 84, 10, 1, 50000, 90000),
(94, 85, 2, 2, 5000, 10000),
(95, 85, 4, 1, 40000, 60000),
(96, 85, 6, 1, 20000, 30000),
(97, 86, 2, 2, 6000, 12000),
(98, 86, 3, 1, 80000, 120000),
(99, 87, 2, 1, 6000, 12000),
(100, 88, 3, 1, 80000, 120000),
(101, 89, 3, 1, 80000, 120000),
(102, 90, 4, 1, 40000, 60000),
(103, 91, 2, 1, 6000, 12000),
(104, 91, 5, 1, 12000, 25000),
(105, 91, 10, 1, 50000, 90000),
(106, 91, 6, 1, 20000, 30000),
(107, 91, 3, 1, 80000, 120000),
(108, 92, 3, 1, 80000, 120000),
(109, 92, 5, 1, 12000, 25000),
(110, 93, 3, 1, 80000, 120000),
(111, 94, 2, 1, 6000, 12000),
(112, 95, 2, 1, 6000, 12000),
(113, 96, 3, 1, 80000, 120000),
(114, 97, 5, 1, 12000, 25000),
(115, 98, 4, 1, 40000, 60000),
(116, 99, 6, 1, 20000, 30000),
(117, 100, 2, 1, 6000, 12000),
(118, 101, 2, 1, 6000, 12000),
(119, 102, 2, 1, 6000, 12000),
(120, 103, 2, 1, 6000, 12000),
(121, 104, 4, 1, 40000, 60000),
(122, 105, 2, 1, 6000, 12000),
(123, 106, 4, 1, 40000, 60000),
(124, 107, 3, 1, 80000, 120000),
(125, 108, 5, 1, 12000, 25000),
(126, 109, 3, 1, 80000, 120000),
(127, 109, 6, 1, 20000, 30000),
(128, 110, 2, 1, 6000, 12000),
(129, 111, 2, 1, 6000, 12000),
(130, 112, 3, 1, 80000, 120000),
(131, 113, 2, 1, 6000, 12000),
(132, 114, 2, 1, 6000, 12000),
(133, 115, 3, 1, 80000, 120000),
(134, 116, 4, 7, 40000, 60000),
(135, 117, 3, 7, 80000, 120000),
(136, 118, 2, 1, 6000, 12000),
(137, 119, 12, 1, 500, 3000),
(138, 120, 2, 1, 6000, 12000),
(139, 121, 4, 1, 40000, 60000),
(140, 122, 3, 1, 80000, 120000),
(141, 123, 10, 2, 50000, 90000),
(142, 124, 3, 1, 80000, 120000),
(143, 125, 2, 1, 6000, 12000),
(144, 125, 5, 1, 12000, 25000),
(145, 125, 9, 1, 5000, 12000),
(146, 125, 14, 1, 30000, 45000),
(147, 125, 6, 1, 20000, 30000),
(148, 126, 2, 1, 6000, 12000),
(149, 127, 2, 1, 6000, 12000),
(150, 128, 3, 1, 80000, 120000),
(151, 129, 2, 1, 6000, 12000),
(152, 130, 2, 1, 6000, 12000),
(153, 131, 2, 1, 6000, 12000),
(154, 132, 3, 1, 80000, 120000),
(155, 133, 6, 1, 20000, 30000),
(156, 133, 8, 1, 2000, 5000),
(157, 133, 9, 1, 5000, 12000),
(158, 134, 4, 1, 40000, 60000),
(159, 134, 18, 1, 4000, 8000),
(160, 135, 2, 1, 6000, 12000),
(161, 135, 5, 1, 12000, 25000),
(162, 138, 3, 1, 80000, 120000),
(163, 139, 6, 1, 20000, 30000),
(164, 140, 3, 1, 80000, 120000),
(165, 141, 4, 1, 40000, 60000),
(166, 142, 6, 1, 20000, 30000),
(167, 143, 3, 1, 80000, 120000),
(168, 144, 4, 1, 40000, 60000),
(169, 145, 6, 1, 20000, 30000),
(170, 146, 8, 1, 2000, 5000),
(171, 147, 3, 1, 80000, 120000),
(172, 148, 2, 1, 6000, 12000),
(173, 149, 4, 1, 40000, 60000),
(174, 150, 4, 1, 40000, 60000),
(175, 151, 3, 1, 80000, 120000),
(176, 152, 15, 1, 60000, 100000),
(177, 153, 6, 1, 20000, 30000),
(178, 153, 3, 1, 80000, 120000),
(179, 154, 14, 1, 30000, 45000),
(180, 154, 5, 1, 12000, 25000),
(181, 155, 18, 1, 4000, 8000),
(182, 156, 2, 1, 6000, 12000),
(183, 157, 2, 1, 6000, 12000),
(184, 157, 6, 1, 20000, 30000),
(185, 157, 9, 1, 5000, 12000),
(186, 158, 2, 1, 4, 8),
(187, 158, 9, 1, 3, 8),
(188, 158, 6, 1, 13, 20),
(189, 158, 16, 1, 4, 8),
(190, 158, 19, 1, 1, 2),
(191, 159, 2, 1, 4, 8),
(192, 160, 2, 1, 4, 8),
(193, 161, 2, 1, 4, 8),
(194, 162, 2, 4, 4, 8),
(195, 164, 2, 1, 12000, 15000),
(196, 165, 2, 1, 12000, 15000),
(197, 166, 3, 2, 160500, 200000),
(198, 167, 3, 1, 155150, 232000),
(199, 168, 2, 1, 11600, 23200),
(200, 169, 3, 1, 155150, 232000),
(201, 170, 2, 1, 11600, 23200),
(202, 171, 2, 1, 11600, 23200),
(203, 172, 2, 1, 12000, 24000),
(204, 173, 4, 1, 78000, 120000),
(205, 174, 2, 1, 12000, 30000),
(206, 175, 8, 1, 15000, 30000),
(207, 176, 2, 1, 12000, 30000),
(208, 177, 2, 1, 12000, 30000),
(209, 177, 34, 1, 80000, 100000),
(210, 177, 35, 1, 6000, 15000),
(211, 178, 2, 1, 12000, 30000),
(212, 178, 34, 1, 80000, 100000),
(213, 179, 2, 1, 12000, 30000),
(214, 179, 34, 1, 80000, 100000),
(215, 180, 2, 1, 12000, 30000),
(216, 180, 34, 1, 80000, 100000),
(217, 181, 2, 1, 12000, 30000),
(218, 181, 34, 1, 80000, 100000),
(219, 182, 2, 1, 12000, 30000),
(220, 183, 34, 1, 80000, 100000),
(221, 184, 2, 1, 12000, 30000),
(222, 184, 34, 1, 80000, 100000),
(223, 185, 2, 1, 12000, 30000),
(224, 185, 3, 1, 160500, 240000),
(225, 186, 2, 2, 12000, 30000),
(226, 186, 34, 1, 80000, 100000),
(227, 187, 2, 1, 12000, 30000),
(228, 188, 2, 2, 12000, 30000),
(229, 189, 2, 1, 12000, 30000),
(230, 189, 4, 1, 78000, 120000),
(231, 190, 2, 1, 12000, 30000),
(232, 190, 4, 1, 78000, 120000),
(233, 191, 2, 1, 12000, 30000),
(234, 192, 2, 1, 12000, 30000),
(235, 192, 3, 1, 160500, 240000),
(236, 192, 4, 1, 78000, 120000),
(237, 193, 2, 1, 12000, 30000),
(238, 194, 2, 1, 12000, 30000),
(239, 195, 2, 1, 12000, 30000);

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
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `SID` int(10) NOT NULL,
  `service_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `service_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `service_cost` decimal(10,0) DEFAULT NULL,
  `service_price` int(10) NOT NULL,
  `service_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services_invoice`
--

CREATE TABLE `services_invoice` (
  `ser_inv_ID` int(10) NOT NULL,
  `customer_ID_FK` int(10) DEFAULT NULL,
  `ser_inv_date` date NOT NULL,
  `ser_inv_time` time NOT NULL,
  `ser_inv_total_cost` decimal(10,0) DEFAULT NULL,
  `ser_inv_total_price` int(10) NOT NULL,
  `invoice_details` json DEFAULT NULL,
  `ser_inv_status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `services_invoice`
--

INSERT INTO `services_invoice` (`ser_inv_ID`, `customer_ID_FK`, `ser_inv_date`, `ser_inv_time`, `ser_inv_total_cost`, `ser_inv_total_price`, `invoice_details`, `ser_inv_status`) VALUES
(1, NULL, '2019-03-31', '03:18:04', '87000', 94000, '[{\"qty\": 1, \"ser_inv_id\": 1, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 1, \"service_cost\": 75000, \"service_name\": \"steam 50$\", \"service_price\": 80000}]', 1),
(2, NULL, '2019-03-31', '03:18:15', '69000', 75000, '[{\"qty\": 1, \"ser_inv_id\": 2, \"service_cost\": 30000, \"service_name\": \"steam 20$\", \"service_price\": 35000}, {\"qty\": 1, \"ser_inv_id\": 2, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(3, NULL, '2019-03-31', '03:26:15', '5500', 6000, '[{\"qty\": 1, \"ser_inv_id\": 3, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(4, NULL, '2019-04-04', '16:54:20', '49250', 50000, '[]', 1),
(5, NULL, '2019-04-04', '16:54:30', '54750', 56000, '[{\"qty\": 1, \"ser_inv_id\": 5, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(6, NULL, '2019-04-04', '16:54:38', '8500', 9000, '[{\"qty\": 1, \"ser_inv_id\": 6, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(7, NULL, '2019-04-04', '16:59:28', '49250', 50000, '[{\"qty\": 1, \"ser_inv_id\": 7, \"service_cost\": 49250, \"service_name\": \"Touch Bill\", \"service_price\": 50000}]', 1),
(8, NULL, '2019-04-04', '17:50:13', '524250', 530000, '[{\"qty\": 1, \"ser_inv_id\": 8, \"service_cost\": 75000, \"service_name\": \"steam 50$\", \"service_price\": 80000}, {\"qty\": 1, \"ser_inv_id\": 8, \"service_cost\": 449250, \"service_name\": \"Alfa Bill\", \"service_price\": 450000}]', 1),
(9, NULL, '2019-04-16', '11:10:46', '543750', 546000, '[{\"qty\": 1, \"ser_inv_id\": 9, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 9, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}, {\"qty\": 1, \"ser_inv_id\": 9, \"service_cost\": 499250, \"service_name\": \"Touch Bill\", \"service_price\": 500000}]', 1),
(10, NULL, '2019-04-16', '11:11:59', '14000', 15000, '[{\"qty\": 1, \"ser_inv_id\": 10, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(11, NULL, '2019-04-16', '11:22:47', '5500', 6000, '[{\"qty\": 1, \"ser_inv_id\": 11, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(12, NULL, '2019-04-16', '11:24:12', '8500', 9000, '[{\"qty\": 1, \"ser_inv_id\": 12, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(13, NULL, '2019-04-16', '11:25:10', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 13, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(14, NULL, '2019-04-26', '13:10:20', '52350', 525000, '[{\"qty\": 1, \"ser_inv_id\": 14, \"service_cost\": 24250, \"service_name\": \"Touch Bill\", \"service_price\": 25000}, {\"qty\": 1, \"ser_inv_id\": 14, \"service_cost\": 499250, \"service_name\": \"Alfa Bill\", \"service_price\": 500000}]', 1),
(15, NULL, '2019-04-26', '18:19:25', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 15, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(16, NULL, '2019-04-28', '00:42:12', '20500', 23000, '[{\"qty\": 1, \"ser_inv_id\": 16, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 16, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(17, NULL, '2019-04-28', '00:42:16', '52000', 54000, '[{\"qty\": 1, \"ser_inv_id\": 17, \"service_cost\": 27000, \"service_name\": \"IDM 1 month\", \"service_price\": 28000}, {\"qty\": 1, \"ser_inv_id\": 17, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}]', 1),
(18, NULL, '2019-04-28', '00:42:21', '53000', 55000, '[{\"qty\": 1, \"ser_inv_id\": 18, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 18, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(19, NULL, '2019-04-28', '00:42:26', '56500', 60000, '[{\"qty\": 1, \"ser_inv_id\": 19, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 19, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 19, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(20, NULL, '2019-04-29', '23:59:21', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 20, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(21, NULL, '2019-05-09', '04:46:39', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 21, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(22, NULL, '2019-05-10', '22:34:21', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 22, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(23, NULL, '2019-05-11', '04:26:37', '5500', 6000, '[{\"qty\": 1, \"ser_inv_id\": 23, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(24, NULL, '2019-05-11', '04:26:46', '79000', 86000, '[{\"qty\": 1, \"ser_inv_id\": 24, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 24, \"service_cost\": 15000, \"service_name\": \"steam 10$\", \"service_price\": 20000}, {\"qty\": 1, \"ser_inv_id\": 24, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}]', 1),
(25, NULL, '2019-05-12', '22:50:01', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 25, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(26, NULL, '2019-07-02', '17:41:30', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 26, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(27, NULL, '2019-07-10', '16:53:01', '49250', 50000, '[{\"qty\": 1, \"ser_inv_id\": 27, \"service_cost\": 49250, \"service_name\": \"Touch Bill\", \"service_price\": 50000}]', 1),
(28, NULL, '2019-07-11', '22:11:58', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 28, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(29, NULL, '2019-07-24', '20:51:19', '78000', 80000, '[{\"qty\": 1, \"ser_inv_id\": 29, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 29, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(30, NULL, '2019-07-24', '20:51:34', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 30, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(31, NULL, '2019-07-25', '22:30:49', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 31, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(32, NULL, '2019-07-25', '22:30:53', '14000', 15000, '[{\"qty\": 1, \"ser_inv_id\": 32, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 1, \"ser_inv_id\": 32, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(33, NULL, '2019-08-11', '15:21:42', '83500', 88000, '[{\"qty\": 1, \"ser_inv_id\": 33, \"service_cost\": 75000, \"service_name\": \"steam 50$\", \"service_price\": 80000}, {\"qty\": 1, \"ser_inv_id\": 33, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 8000}]', 1),
(34, NULL, '2019-08-23', '19:39:39', '90000', 94000, '[{\"qty\": 1, \"ser_inv_id\": 34, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 2, \"ser_inv_id\": 34, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(35, NULL, '2019-08-23', '22:21:58', '390000', 390000, '[{\"qty\": 10, \"ser_inv_id\": 35, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 39000}]', 1),
(36, NULL, '2019-08-23', '22:22:15', '67000', 70000, '[{\"qty\": 1, \"ser_inv_id\": 36, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 2, \"ser_inv_id\": 36, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(37, NULL, '2019-08-23', '22:22:20', '42000', 45000, '[{\"qty\": 3, \"ser_inv_id\": 37, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(38, NULL, '2019-08-24', '00:48:14', '117000', 120000, '[{\"qty\": 3, \"ser_inv_id\": 38, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(39, NULL, '2019-08-24', '17:42:12', '195000', 200000, '[{\"qty\": 5, \"ser_inv_id\": 39, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(40, NULL, '2019-08-26', '16:28:16', '90000', 94000, '[{\"qty\": 1, \"ser_inv_id\": 40, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 2, \"ser_inv_id\": 40, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(41, NULL, '2019-08-26', '18:04:02', '93500', 99000, '[{\"qty\": 1, \"ser_inv_id\": 41, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 41, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 5, \"ser_inv_id\": 41, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(42, NULL, '2019-08-27', '00:00:50', '68000', 72000, '[{\"qty\": 1, \"ser_inv_id\": 42, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 42, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 2, \"ser_inv_id\": 42, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(43, NULL, '2019-08-31', '14:45:30', '68000', 72000, '[{\"qty\": 1, \"ser_inv_id\": 43, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 43, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 2, \"ser_inv_id\": 43, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(44, NULL, '2019-09-01', '15:21:15', '98500', 103000, '[{\"qty\": 1, \"ser_inv_id\": 44, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 2, \"ser_inv_id\": 44, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 44, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(45, NULL, '2019-09-02', '03:33:14', '166250', 170000, '[{\"qty\": 2, \"ser_inv_id\": 45, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 45, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 45, \"service_cost\": 49250, \"service_name\": \"Alfa Bill\", \"service_price\": 50000}]', 1),
(46, NULL, '2019-09-02', '10:11:10', '0', 0, '[]', 1),
(47, NULL, '2019-10-06', '20:45:03', '86500', 89000, '[{\"qty\": 2, \"ser_inv_id\": 47, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 47, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(48, NULL, '2019-10-11', '01:19:08', '59500', 63000, '[{\"qty\": 1, \"ser_inv_id\": 48, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 48, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 48, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(49, NULL, '2019-10-16', '22:18:19', '56500', 60000, '[{\"qty\": 1, \"ser_inv_id\": 49, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 49, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 49, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(50, NULL, '2019-10-16', '22:19:02', '71500', 77000, '[{\"qty\": 2, \"ser_inv_id\": 50, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 50, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 50, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(51, NULL, '2019-10-16', '22:19:09', '98000', 110000, '[{\"qty\": 1, \"ser_inv_id\": 51, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 51, \"service_cost\": 15000, \"service_name\": \"steam 10$\", \"service_price\": 20000}, {\"qty\": 1, \"ser_inv_id\": 51, \"service_cost\": 30000, \"service_name\": \"steam 20$\", \"service_price\": 35000}, {\"qty\": 1, \"ser_inv_id\": 51, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(52, NULL, '2019-11-24', '00:51:18', '18000', 21000, '[{\"qty\": 1, \"ser_inv_id\": 52, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 52, \"service_cost\": 6000, \"service_name\": \"test\", \"service_price\": 7000}]', 1),
(53, NULL, '2019-11-24', '00:56:01', '47500', 49000, '[{\"qty\": 1, \"ser_inv_id\": 53, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 53, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(54, NULL, '2019-11-24', '00:56:12', '20500', 23000, '[{\"qty\": 1, \"ser_inv_id\": 54, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 54, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(55, NULL, '2019-11-24', '02:59:07', '7000', 10000, '[{\"qty\": 1, \"ser_inv_id\": 55, \"service_cost\": 7000, \"service_name\": \"touch haha\", \"service_price\": 10000}]', 1),
(56, NULL, '2019-11-24', '03:09:48', '7000', 10000, '[{\"qty\": 1, \"ser_inv_id\": 56, \"service_cost\": 7000, \"service_name\": \"touch haha\", \"service_price\": 10000}]', 1),
(57, NULL, '2019-11-24', '03:47:51', '94000', 100000, '[{\"qty\": 1, \"ser_inv_id\": 57, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 10, \"ser_inv_id\": 57, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(58, NULL, '2019-11-24', '04:07:52', '102000', 108000, '[{\"qty\": 2, \"ser_inv_id\": 58, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 2, \"ser_inv_id\": 58, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(59, NULL, '2019-11-24', '04:09:12', '446000', 480000, '[{\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 15000, \"service_name\": \"steam 10$\", \"service_price\": 20000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 30000, \"service_name\": \"steam 20$\", \"service_price\": 35000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 75000, \"service_name\": \"steam 50$\", \"service_price\": 80000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 27000, \"service_name\": \"IDM 1 month\", \"service_price\": 28000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 6000, \"service_name\": \"test\", \"service_price\": 7000}, {\"qty\": 1, \"ser_inv_id\": 59, \"service_cost\": 150000, \"service_name\": \"steam 100$\", \"service_price\": 160000}]', 1),
(60, NULL, '2019-11-24', '04:10:27', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 60, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(61, NULL, '2019-11-24', '20:15:47', '20000', 30000, '[{\"qty\": 1, \"ser_inv_id\": 61, \"service_cost\": 20000, \"service_name\": \"steam 50$\", \"service_price\": 30000}]', 1),
(62, NULL, '2019-11-24', '20:17:23', '40000', 60000, '[{\"qty\": 1, \"ser_inv_id\": 62, \"service_cost\": 40000, \"service_name\": \"steam 10$\", \"service_price\": 60000}]', 1),
(63, NULL, '2019-11-24', '20:19:58', '76000', 80000, '[{\"qty\": 1, \"ser_inv_id\": 63, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 63, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}, {\"qty\": 1, \"ser_inv_id\": 63, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(64, NULL, '2019-11-24', '20:21:40', '25000', 26000, '[{\"qty\": 1, \"ser_inv_id\": 64, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}]', 1),
(65, NULL, '2019-11-24', '20:21:58', '90000', 94000, '[{\"qty\": 1, \"ser_inv_id\": 65, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 65, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 65, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(66, NULL, '2019-11-24', '20:22:27', '14000', 15000, '[{\"qty\": 1, \"ser_inv_id\": 66, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(67, NULL, '2019-11-24', '20:22:49', '80000', 83000, '[{\"qty\": 1, \"ser_inv_id\": 67, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 67, \"service_cost\": 27000, \"service_name\": \"IDM 1 month\", \"service_price\": 28000}, {\"qty\": 1, \"ser_inv_id\": 67, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(68, NULL, '2019-11-24', '20:26:51', '27000', 28000, '[{\"qty\": 1, \"ser_inv_id\": 68, \"service_cost\": 27000, \"service_name\": \"IDM 1 month\", \"service_price\": 28000}]', 1),
(69, NULL, '2019-11-24', '20:27:06', '117000', 120000, '[{\"qty\": 3, \"ser_inv_id\": 69, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}]', 1),
(70, NULL, '2019-11-26', '01:40:06', '14000', 15000, '[{\"qty\": 1, \"ser_inv_id\": 70, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 1, \"ser_inv_id\": 70, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(71, NULL, '2019-11-26', '01:41:41', '51000', 54000, '[{\"qty\": 1, \"ser_inv_id\": 71, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 71, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(72, NULL, '2019-11-29', '09:18:16', '73500', 78000, '[{\"qty\": 1, \"ser_inv_id\": 72, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 72, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 72, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}, {\"qty\": 1, \"ser_inv_id\": 72, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(73, NULL, '2019-11-29', '13:24:27', '52000', 54000, '[{\"qty\": 1, \"ser_inv_id\": 73, \"service_cost\": 27000, \"service_name\": \"IDM 1 month\", \"service_price\": 28000}, {\"qty\": 1, \"ser_inv_id\": 73, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}]', 1),
(74, NULL, '2019-12-04', '17:07:05', '47500', 49000, '[{\"qty\": 1, \"ser_inv_id\": 74, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 74, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(75, NULL, '2019-12-04', '17:07:12', '14000', 15000, '[{\"qty\": 1, \"ser_inv_id\": 75, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 1, \"ser_inv_id\": 75, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(76, NULL, '2019-12-04', '17:07:20', '14000', 15000, '[{\"qty\": 1, \"ser_inv_id\": 76, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(77, NULL, '2019-12-04', '18:02:34', '37000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 77, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 77, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}]', 1),
(78, NULL, '2019-12-04', '22:33:33', '44500', 46000, '[{\"qty\": 1, \"ser_inv_id\": 78, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 78, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(79, NULL, '2019-12-04', '22:33:41', '5500', 6000, '[{\"qty\": 1, \"ser_inv_id\": 79, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(80, NULL, '2019-12-04', '22:41:45', '8500', 9000, '[{\"qty\": 1, \"ser_inv_id\": 80, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(81, NULL, '2019-12-04', '22:47:13', '73500', 78000, '[{\"qty\": 1, \"ser_inv_id\": 81, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 81, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}, {\"qty\": 1, \"ser_inv_id\": 81, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 81, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(82, NULL, '2019-12-05', '17:47:40', '47500', 49000, '[{\"qty\": 1, \"ser_inv_id\": 82, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 82, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(83, NULL, '2019-12-05', '17:50:38', '47500', 49000, '[{\"qty\": 1, \"ser_inv_id\": 83, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 83, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(84, NULL, '2019-12-05', '17:53:45', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 84, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(85, NULL, '2019-12-06', '08:06:11', '27000', 28000, '[{\"qty\": 1, \"ser_inv_id\": 85, \"service_cost\": 27000, \"service_name\": \"IDM 1 month\", \"service_price\": 28000}]', 1),
(86, NULL, '2019-12-13', '23:20:20', '47500', 49000, '[{\"qty\": 1, \"ser_inv_id\": 86, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 86, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(87, NULL, '2019-12-15', '19:27:25', '86500', 85000, '[{\"qty\": 2, \"ser_inv_id\": 87, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 87, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 5000}]', 1),
(88, NULL, '2019-12-15', '19:38:16', '51000', 54000, '[{\"qty\": 1, \"ser_inv_id\": 88, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 88, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(89, NULL, '2019-12-15', '19:39:07', '53000', 55000, '[{\"qty\": 1, \"ser_inv_id\": 89, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 89, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 1, \"ser_inv_id\": 89, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(90, 3, '2019-12-15', '19:40:01', '51000', 54000, '[{\"qty\": 1, \"ser_inv_id\": 90, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 90, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(91, 3, '2019-12-15', '19:40:27', '150000', 200000, '[{\"qty\": 10, \"ser_inv_id\": 91, \"service_cost\": 15000, \"service_name\": \"steam 10$\", \"service_price\": 20000}]', 1),
(92, NULL, '2019-12-15', '19:43:09', '114000', 120000, '[{\"qty\": 1, \"ser_inv_id\": 92, \"service_cost\": 75000, \"service_name\": \"steam 50$\", \"service_price\": 80000}, {\"qty\": 1, \"ser_inv_id\": 92, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(93, NULL, '2019-12-15', '23:16:30', '57000', 61000, '[{\"qty\": 1, \"ser_inv_id\": 93, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 93, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 93, \"service_cost\": 6000, \"service_name\": \"test\", \"service_price\": 7000}]', 1),
(94, NULL, '2019-12-16', '13:25:46', '92000', 95000, '[{\"qty\": 2, \"ser_inv_id\": 94, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 94, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 1, \"ser_inv_id\": 94, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(95, NULL, '2019-12-16', '21:43:34', '59500', 63000, '[{\"qty\": 1, \"ser_inv_id\": 95, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"ser_inv_id\": 95, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"ser_inv_id\": 95, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(96, NULL, '2020-04-13', '23:45:58', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 96, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(97, NULL, '2020-04-13', '23:51:20', '5500', 6000, '[{\"qty\": 1, \"ser_inv_id\": 97, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 1),
(98, 1, '2020-04-13', '23:53:18', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 98, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(99, NULL, '2020-04-14', '15:04:49', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 99, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(100, NULL, '2020-04-21', '21:54:54', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 100, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(101, 2, '2020-04-22', '21:43:08', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 101, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(102, 2, '2020-04-22', '21:46:24', '39000', 40000, '[{\"qty\": 1, \"ser_inv_id\": 102, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}]', 1),
(103, 1, '2020-04-23', '20:44:47', '12000', 14000, '[{\"qty\": 1, \"ser_inv_id\": 103, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(106, NULL, '2020-08-21', '16:31:25', '88000', 94000, '[{\"qty\": 1, \"service_ID\": 8, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}, {\"qty\": 1, \"service_ID\": 10, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 2, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 0),
(107, NULL, '2020-08-21', '17:10:00', '68000', 72000, '[{\"qty\": 1, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"service_ID\": 10, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 2, \"service_ID\": 11, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 0),
(108, NULL, '2020-08-21', '17:14:02', '36000', 42000, '[{\"qty\": 3, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 0),
(109, NULL, '2020-08-21', '17:14:35', '64000', 67000, '[{\"qty\": 1, \"service_ID\": 10, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"service_ID\": 11, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 3, \"service_ID\": 12, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 0),
(110, NULL, '2020-08-21', '17:15:59', '12000', 14000, '[{\"qty\": 1, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 0),
(111, NULL, '2020-08-30', '13:01:07', '59500', 63000, '[{\"qty\": 1, \"service_ID\": 11, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 1, \"service_ID\": 10, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 0),
(112, NULL, '2020-08-30', '13:01:53', '59500', 63000, '[{\"qty\": 1, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"service_ID\": 10, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"service_ID\": 11, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 1),
(113, NULL, '2020-08-30', '17:32:47', '146000', 152000, '[{\"qty\": 3, \"service_ID\": 10, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 2, \"service_ID\": 11, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}, {\"qty\": 1, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 1),
(114, NULL, '2020-08-30', '17:32:52', '28000', 30000, '[{\"qty\": 2, \"service_ID\": 9, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 1),
(115, NULL, '2020-08-30', '17:34:19', '53000', 55000, '[{\"qty\": 1, \"service_ID\": 3, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}, {\"qty\": 1, \"service_ID\": 9, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}]', 0),
(116, NULL, '2020-08-30', '17:34:23', '52000', 54000, '[{\"qty\": 1, \"service_ID\": 8, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}, {\"qty\": 1, \"service_ID\": 7, \"service_cost\": 27000, \"service_name\": \"IDM 1 month\", \"service_price\": 28000}]', 0),
(117, NULL, '2020-08-30', '17:34:28', '45000', 55000, '[{\"qty\": 1, \"service_ID\": 5, \"service_cost\": 30000, \"service_name\": \"steam 20$\", \"service_price\": 35000}, {\"qty\": 1, \"service_ID\": 4, \"service_cost\": 15000, \"service_name\": \"steam 10$\", \"service_price\": 20000}]', 0),
(118, NULL, '2020-08-30', '17:34:32', '51000', 54000, '[{\"qty\": 1, \"service_ID\": 10, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}]', 0),
(119, NULL, '2020-08-30', '17:34:36', '11000', 12000, '[{\"qty\": 2, \"service_ID\": 12, \"service_cost\": 5500, \"service_name\": \"touch 3$\", \"service_price\": 6000}]', 0),
(120, NULL, '2020-11-23', '12:22:04', '51000', 54000, '[{\"qty\": 1, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"service_ID\": 3, \"service_cost\": 39000, \"service_name\": \"alfa 1 monthssss\", \"service_price\": 40000}]', 1),
(121, NULL, '2020-11-23', '12:22:16', '114000', 121000, '[{\"qty\": 1, \"service_ID\": 9, \"service_cost\": 14000, \"service_name\": \"alfa 10$\", \"service_price\": 15000}, {\"qty\": 1, \"service_ID\": 8, \"service_cost\": 25000, \"service_name\": \"Cyberia 1 Month\", \"service_price\": 26000}, {\"qty\": 1, \"service_ID\": 6, \"service_cost\": 75000, \"service_name\": \"steam 50$\", \"service_price\": 80000}]', 1),
(122, 3, '2020-11-28', '20:52:34', '59500', 63000, '[{\"qty\": 1, \"service_ID\": 10, \"service_cost\": 39000, \"service_name\": \"touch 1 Month\", \"service_price\": 40000}, {\"qty\": 1, \"service_ID\": 2, \"service_cost\": 12000, \"service_name\": \"touch 10$\", \"service_price\": 14000}, {\"qty\": 1, \"service_ID\": 11, \"service_cost\": 8500, \"service_name\": \"touch 5$\", \"service_price\": 9000}]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ser_inv_details`
--

CREATE TABLE `ser_inv_details` (
  `ser_inv_det_ID` int(100) NOT NULL,
  `ser_inv_id` int(10) NOT NULL,
  `ser_inv_SID` int(10) NOT NULL,
  `ser_inv_quantity` int(10) NOT NULL,
  `ser_inv_cost` int(10) NOT NULL,
  `ser_inv_price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ser_inv_details`
--

INSERT INTO `ser_inv_details` (`ser_inv_det_ID`, `ser_inv_id`, `ser_inv_SID`, `ser_inv_quantity`, `ser_inv_cost`, `ser_inv_price`) VALUES
(1, 1, 6, 1, 75000, 80000),
(2, 1, 2, 1, 12000, 14000),
(3, 2, 5, 1, 30000, 35000),
(4, 2, 10, 1, 39000, 40000),
(5, 3, 12, 1, 5500, 6000),
(6, 5, 12, 1, 5500, 6000),
(7, 6, 11, 1, 8500, 9000),
(8, 7, 13, 1, 49250, 50000),
(9, 8, 6, 1, 75000, 80000),
(10, 8, 14, 1, 449250, 450000),
(11, 9, 10, 1, 39000, 40000),
(12, 9, 12, 1, 5500, 6000),
(13, 9, 13, 1, 499250, 500000),
(14, 10, 9, 1, 14000, 15000),
(15, 11, 12, 1, 5500, 6000),
(16, 12, 11, 1, 8500, 9000),
(17, 13, 10, 1, 39000, 40000),
(18, 14, 14, 1, 499250, 500000),
(19, 14, 13, 1, 24250, 25000),
(20, 15, 10, 1, 39000, 40000),
(21, 16, 2, 1, 12000, 14000),
(22, 16, 11, 1, 8500, 9000),
(23, 17, 7, 1, 27000, 28000),
(24, 17, 8, 1, 25000, 26000),
(25, 18, 9, 1, 14000, 15000),
(26, 18, 3, 1, 39000, 40000),
(27, 19, 2, 1, 12000, 14000),
(28, 19, 12, 1, 5500, 6000),
(29, 19, 10, 1, 39000, 40000),
(30, 20, 10, 1, 39000, 40000),
(31, 21, 2, 1, 12000, 14000),
(32, 22, 2, 1, 12000, 14000),
(33, 23, 12, 1, 5500, 6000),
(34, 24, 3, 1, 39000, 40000),
(35, 24, 8, 1, 25000, 26000),
(36, 24, 4, 1, 15000, 20000),
(37, 25, 10, 1, 39000, 40000),
(38, 26, 10, 1, 39000, 40000),
(39, 27, 13, 1, 49250, 50000),
(40, 28, 2, 1, 12000, 14000),
(41, 29, 10, 1, 39000, 40000),
(42, 29, 10, 1, 39000, 40000),
(43, 30, 2, 1, 12000, 14000),
(44, 31, 10, 1, 39000, 40000),
(45, 32, 11, 1, 8500, 9000),
(46, 32, 12, 1, 5500, 6000),
(47, 33, 11, 1, 8500, 8000),
(48, 33, 6, 1, 75000, 80000),
(49, 34, 2, 1, 12000, 14000),
(50, 34, 10, 2, 39000, 40000),
(51, 35, 10, 10, 39000, 39000),
(52, 36, 9, 2, 14000, 15000),
(53, 36, 3, 1, 39000, 40000),
(54, 37, 9, 3, 14000, 15000),
(55, 38, 10, 3, 39000, 40000),
(56, 39, 10, 5, 39000, 40000),
(57, 40, 10, 2, 39000, 40000),
(58, 40, 2, 1, 12000, 14000),
(59, 41, 2, 1, 12000, 14000),
(60, 41, 10, 1, 39000, 40000),
(61, 41, 11, 5, 8500, 9000),
(62, 42, 2, 1, 12000, 14000),
(63, 42, 10, 1, 39000, 40000),
(64, 42, 11, 2, 8500, 9000),
(65, 43, 2, 1, 12000, 14000),
(66, 43, 10, 1, 39000, 40000),
(67, 43, 11, 2, 8500, 9000),
(68, 44, 2, 1, 12000, 14000),
(69, 44, 11, 1, 8500, 9000),
(70, 44, 10, 2, 39000, 40000),
(71, 45, 10, 1, 39000, 40000),
(72, 45, 3, 2, 39000, 40000),
(73, 45, 14, 1, 49250, 50000),
(74, 47, 10, 2, 39000, 40000),
(75, 47, 11, 1, 8500, 9000),
(76, 48, 10, 1, 39000, 40000),
(77, 48, 2, 1, 12000, 14000),
(78, 48, 11, 1, 8500, 9000),
(79, 49, 10, 1, 39000, 40000),
(80, 49, 2, 1, 12000, 14000),
(81, 49, 12, 1, 5500, 6000),
(82, 50, 11, 1, 8500, 9000),
(83, 50, 10, 1, 39000, 40000),
(84, 50, 2, 2, 12000, 14000),
(85, 51, 9, 1, 14000, 15000),
(86, 51, 3, 1, 39000, 40000),
(87, 51, 5, 1, 30000, 35000),
(88, 51, 4, 1, 15000, 20000),
(89, 52, 16, 1, 6000, 7000),
(90, 52, 2, 1, 12000, 14000),
(91, 53, 10, 1, 39000, 40000),
(92, 53, 11, 1, 8500, 9000),
(93, 54, 11, 1, 8500, 9000),
(94, 54, 2, 1, 12000, 14000),
(95, 55, 17, 1, 7000, 10000),
(96, 56, 17, 1, 7000, 10000),
(97, 57, 10, 1, 39000, 40000),
(98, 57, 12, 10, 5500, 6000),
(99, 58, 2, 2, 12000, 14000),
(100, 58, 10, 2, 39000, 40000),
(101, 59, 18, 1, 150000, 160000),
(102, 59, 16, 1, 6000, 7000),
(103, 59, 12, 1, 5500, 6000),
(104, 59, 6, 1, 75000, 80000),
(105, 59, 10, 1, 39000, 40000),
(106, 59, 11, 1, 8500, 9000),
(107, 59, 2, 1, 12000, 14000),
(108, 59, 9, 1, 14000, 15000),
(109, 59, 7, 1, 27000, 28000),
(110, 59, 5, 1, 30000, 35000),
(111, 59, 4, 1, 15000, 20000),
(112, 59, 3, 1, 39000, 40000),
(113, 59, 8, 1, 25000, 26000),
(114, 60, 2, 1, 12000, 14000),
(115, 61, 6, 1, 20000, 30000),
(116, 62, 4, 1, 40000, 60000),
(117, 63, 10, 1, 39000, 40000),
(118, 63, 8, 1, 25000, 26000),
(119, 63, 2, 1, 12000, 14000),
(120, 64, 8, 1, 25000, 26000),
(121, 65, 2, 1, 12000, 14000),
(122, 65, 10, 1, 39000, 40000),
(123, 65, 3, 1, 39000, 40000),
(124, 66, 9, 1, 14000, 15000),
(125, 67, 9, 1, 14000, 15000),
(126, 67, 3, 1, 39000, 40000),
(127, 67, 7, 1, 27000, 28000),
(128, 68, 7, 1, 27000, 28000),
(129, 69, 3, 3, 39000, 40000),
(130, 70, 12, 1, 5500, 6000),
(131, 70, 11, 1, 8500, 9000),
(132, 71, 10, 1, 39000, 40000),
(133, 71, 2, 1, 12000, 14000),
(134, 72, 3, 1, 39000, 40000),
(135, 72, 11, 1, 8500, 9000),
(136, 72, 2, 1, 12000, 14000),
(137, 72, 9, 1, 14000, 15000),
(138, 73, 7, 1, 27000, 28000),
(139, 73, 8, 1, 25000, 26000),
(140, 74, 10, 1, 39000, 40000),
(141, 74, 11, 1, 8500, 9000),
(142, 75, 12, 1, 5500, 6000),
(143, 75, 11, 1, 8500, 9000),
(144, 76, 9, 1, 14000, 15000),
(145, 77, 2, 1, 12000, 14000),
(146, 77, 8, 1, 25000, 26000),
(147, 78, 10, 1, 39000, 40000),
(148, 78, 12, 1, 5500, 6000),
(149, 79, 12, 1, 5500, 6000),
(150, 80, 11, 1, 8500, 9000),
(151, 81, 11, 1, 8500, 9000),
(152, 81, 10, 1, 39000, 40000),
(153, 81, 2, 1, 12000, 14000),
(154, 81, 9, 1, 14000, 15000),
(155, 82, 10, 1, 39000, 40000),
(156, 82, 11, 1, 8500, 9000),
(157, 83, 11, 1, 8500, 9000),
(158, 83, 10, 1, 39000, 40000),
(159, 84, 10, 1, 39000, 40000),
(160, 85, 7, 1, 27000, 28000),
(161, 86, 10, 1, 39000, 40000),
(162, 86, 11, 1, 8500, 9000),
(163, 87, 10, 2, 39000, 40000),
(164, 87, 11, 1, 8500, 5000),
(165, 88, 10, 1, 39000, 40000),
(166, 88, 2, 1, 12000, 14000),
(167, 89, 11, 1, 8500, 9000),
(168, 89, 10, 1, 39000, 40000),
(169, 89, 12, 1, 5500, 6000),
(170, 90, 10, 1, 39000, 40000),
(171, 90, 2, 1, 12000, 14000),
(172, 91, 4, 10, 15000, 20000),
(173, 92, 6, 1, 75000, 80000),
(174, 92, 10, 1, 39000, 40000),
(175, 93, 10, 1, 39000, 40000),
(176, 93, 2, 1, 12000, 14000),
(177, 93, 16, 1, 6000, 7000),
(178, 94, 11, 1, 8500, 9000),
(179, 94, 10, 2, 39000, 40000),
(180, 94, 12, 1, 5500, 6000),
(181, 95, 11, 1, 8500, 9000),
(182, 95, 10, 1, 39000, 40000),
(183, 95, 2, 1, 12000, 14000),
(184, 96, 10, 1, 39000, 40000),
(185, 97, 12, 1, 5500, 6000),
(186, 98, 2, 1, 12000, 14000),
(187, 99, 2, 1, 12000, 14000),
(188, 100, 2, 1, 12000, 14000),
(189, 101, 10, 1, 39000, 40000),
(190, 102, 10, 1, 39000, 40000),
(191, 103, 2, 1, 12000, 14000);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `IID` int(10) NOT NULL,
  `barcode` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `item_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `item_qty` int(10) DEFAULT NULL,
  `item_currency` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `item_cost` float DEFAULT NULL,
  `item_price` float DEFAULT NULL,
  `notes` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_hidden` tinyint(1) NOT NULL DEFAULT '0',
  `item_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(2, 'user', 'ee11cbb19052e40b07aac0ca060c23ee', 'user', 'ghadir', 1, 1, 1, 0, 1),
(3, 'jaafar', '21232f297a57a5a743894a0e4a801fc3', 'user', 'jeff', 0, 0, 0, 0, 0);

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
-- Indexes for table `debts`
--
ALTER TABLE `debts`
  ADD PRIMARY KEY (`debt_ID`),
  ADD KEY `customer_ID_FK` (`customer_ID_FK`);

--
-- Indexes for table `debts_payments`
--
ALTER TABLE `debts_payments`
  ADD PRIMARY KEY (`payment_ID`),
  ADD KEY `debt_ID_FK` (`debt_ID_FK`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`inv_ID`),
  ADD KEY `customer_ID_FK` (`customer_ID_FK`);

--
-- Indexes for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`inv_det_ID`),
  ADD KEY `inv_det_IID` (`inv_det_IID`),
  ADD KEY `inv_id` (`inv_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_ID`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`reminder_ID`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`SID`);

--
-- Indexes for table `services_invoice`
--
ALTER TABLE `services_invoice`
  ADD PRIMARY KEY (`ser_inv_ID`),
  ADD KEY `ser_inv_date` (`ser_inv_date`),
  ADD KEY `customer_ID_FK` (`customer_ID_FK`);

--
-- Indexes for table `ser_inv_details`
--
ALTER TABLE `ser_inv_details`
  ADD PRIMARY KEY (`ser_inv_det_ID`),
  ADD KEY `ser_inv_id` (`ser_inv_id`,`ser_inv_SID`),
  ADD KEY `ser_inv_SID` (`ser_inv_SID`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`IID`);

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
  MODIFY `customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1027;

--
-- AUTO_INCREMENT for table `customer_payments`
--
ALTER TABLE `customer_payments`
  MODIFY `payment_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `debts`
--
ALTER TABLE `debts`
  MODIFY `debt_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `debts_payments`
--
ALTER TABLE `debts_payments`
  MODIFY `payment_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `inv_ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT for table `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `inv_det_ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `reminder_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `SID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services_invoice`
--
ALTER TABLE `services_invoice`
  MODIFY `ser_inv_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `ser_inv_details`
--
ALTER TABLE `ser_inv_details`
  MODIFY `ser_inv_det_ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `IID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
  ADD CONSTRAINT `customer_payments_ibfk_1` FOREIGN KEY (`customer_ID_FK`) REFERENCES `customers` (`customer_ID`);

--
-- Constraints for table `debts`
--
ALTER TABLE `debts`
  ADD CONSTRAINT `debts_ibfk_1` FOREIGN KEY (`customer_ID_FK`) REFERENCES `customers` (`customer_ID`);

--
-- Constraints for table `debts_payments`
--
ALTER TABLE `debts_payments`
  ADD CONSTRAINT `debts_payments_ibfk_1` FOREIGN KEY (`debt_ID_FK`) REFERENCES `debts` (`debt_id`);

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`customer_ID_FK`) REFERENCES `customers` (`customer_ID`);

--
-- Constraints for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD CONSTRAINT `invoice_details_ibfk_1` FOREIGN KEY (`inv_det_IID`) REFERENCES `stock` (`iid`),
  ADD CONSTRAINT `invoice_details_ibfk_2` FOREIGN KEY (`inv_id`) REFERENCES `invoice` (`inv_id`);

--
-- Constraints for table `services_invoice`
--
ALTER TABLE `services_invoice`
  ADD CONSTRAINT `services_invoice_ibfk_1` FOREIGN KEY (`customer_ID_FK`) REFERENCES `customers` (`customer_ID`);

--
-- Constraints for table `ser_inv_details`
--
ALTER TABLE `ser_inv_details`
  ADD CONSTRAINT `ser_inv_details_ibfk_1` FOREIGN KEY (`ser_inv_SID`) REFERENCES `services` (`sid`),
  ADD CONSTRAINT `ser_inv_details_ibfk_2` FOREIGN KEY (`ser_inv_id`) REFERENCES `services_invoice` (`ser_inv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
