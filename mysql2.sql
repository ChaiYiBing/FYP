-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 01:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysql2`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('Shirt','Pants') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `month` enum('January','February','March','April','May','June','July','August','September','October','November','December') NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `type`, `price`, `image`, `month`, `rating`, `created_at`, `updated_at`) VALUES
(1, 'Graphic Tee', 'Shirt', 21.95, 'https://via.placeholder.com/150', 'January', 4, '2024-11-25 17:17:47', '2024-11-25 17:23:20'),
(2, 'Hoodie', 'Shirt', 38.95, 'https://via.placeholder.com/150', 'February', 5, '2024-11-25 17:17:47', '2024-11-25 17:17:47'),
(3, 'Basic Tee', 'Shirt', 19.95, 'https://via.placeholder.com/150', 'March', 3, '2024-11-25 17:17:47', '2024-11-25 17:17:47'),
(4, 'Long Sleeve Tee', 'Shirt', 22.95, 'https://via.placeholder.com/150', 'April', 4, '2024-11-25 17:17:47', '2024-11-25 17:17:47'),
(5, 'V-Neck Tee', 'Shirt', 24.95, 'https://via.placeholder.com/150', 'May', 4, '2024-11-25 17:17:47', '2024-11-25 17:17:47'),
(6, 'Jeans', 'Pants', 29.95, 'https://via.placeholder.com/150', 'January', 5, '2024-11-25 17:17:47', '2024-11-25 17:17:47'),
(7, 'Chinos', 'Pants', 27.95, 'https://via.placeholder.com/150', 'February', 3, '2024-11-25 17:17:47', '2024-11-25 17:17:47'),
(8, 'Sweatpants', 'Pants', 25.95, 'https://via.placeholder.com/150', 'March', 4, '2024-11-25 17:17:47', '2024-11-25 17:17:47'),
(9, 'Shorts', 'Pants', 19.95, 'https://via.placeholder.com/150', 'April', 2, '2024-11-25 17:17:47', '2024-11-25 17:17:47'),
(10, 'Joggers', 'Pants', 23.95, 'https://via.placeholder.com/150', 'May', 4, '2024-11-25 17:17:47', '2024-11-25 17:17:47');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `sale_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `product_id`, `quantity`, `total_price`, `customer_name`, `sale_date`) VALUES
(1, 1, 2, 43.90, 'Alice Johnson', '2024-11-25 23:54:28'),
(2, 2, 1, 38.95, 'Bob Smith', '2024-11-25 23:54:28'),
(3, 3, 3, 59.85, 'Charlie Brown', '2024-11-25 23:54:28'),
(4, 4, 1, 22.95, 'Diana Prince', '2024-11-25 23:54:28'),
(5, 5, 2, 49.90, 'Evan Carter', '2024-11-25 23:54:28'),
(6, 6, 1, 29.95, 'Fiona Harper', '2024-11-25 23:54:28'),
(7, 7, 4, 111.80, 'George Miles', '2024-11-25 23:54:28'),
(8, 8, 2, 51.90, 'Hannah Taylor', '2024-11-25 23:54:28'),
(9, 9, 1, 19.95, 'Ivy Parker', '2024-11-25 23:54:28'),
(10, 10, 3, 71.85, 'Jack Daniels', '2024-11-25 23:54:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`, `is_active`, `role`) VALUES
(2, 'rather', 'rather@gmail.com', '$2b$10$aRLKmBTZv.eSuvHL6GeR5uEJFkSM.QrrQljgl2eJXve4AkHx3fQNC', '2024-11-25 16:46:17', '2024-11-26 00:17:47', 1, 'user'),
(13, 'try', '123@gmail.com', '$2b$10$yiY2jupUAqTCUbAmF0hvue4dMc9MCWKIQ5Ghge/FLNXS2o2mjG6XO', '2024-11-25 23:36:46', '2024-11-26 00:20:58', 1, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
