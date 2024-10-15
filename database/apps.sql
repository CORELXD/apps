-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 15, 2024 at 04:40 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apps`
--

-- --------------------------------------------------------

--
-- Table structure for table `rekon`
--

CREATE TABLE `rekon` (
  `id_rekon` int NOT NULL,
  `incident` varchar(255) DEFAULT NULL,
  `customer` varchar(255) DEFAULT NULL,
  `layanan` enum('','ASTINET','VPNIP','WIFI','INTERNET','VOICE','IPTV') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'diisi sesuai kolom service type laporan DSO',
  `kategori` varchar(255) DEFAULT NULL COMMENT 'diisi hanya untuk layanan datin, jika bukan layanan datin abaikan saja',
  `regional` varchar(255) DEFAULT NULL,
  `witel` enum('','Surabaya Utara','Surabaya Selatan','Madura','Sidoarjo','Pasuruan','Jember','Malang','Kediri','Madiun','Denpasar','Singaraja','NTB','NTT') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `jenis_permintaan` enum('','exclude','reduksi') DEFAULT '' COMMENT 'diisi EXCLUDE or REDUKSI, sesuai dengan pengajuan',
  `reason` varchar(255) DEFAULT NULL,
  `ttr_e2e_awal` varchar(255) DEFAULT NULL,
  `ttr_after_reduksi` varchar(255) DEFAULT NULL,
  `eviden` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `catatan_sda` varchar(255) DEFAULT NULL,
  `validasi_sda` varchar(255) DEFAULT NULL,
  `approved_not_ppq` varchar(255) DEFAULT NULL,
  `rep_rec` varchar(255) DEFAULT NULL COMMENT 'khusus untuk K1 DATIN saja, apabila ada perubahan REPAIR atau RECOVERY',
  `change_to` varchar(255) DEFAULT NULL COMMENT 'diisi apabila pengajuan EXCLUDE ke OTHERSIDE, jika REDUKSI diabaikan',
  `level_acc` enum('waiting','approve','reject') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `reject_reason` varchar(255) DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rekon`
--

INSERT INTO `rekon` (`id_rekon`, `incident`, `customer`, `layanan`, `kategori`, `regional`, `witel`, `jenis_permintaan`, `reason`, `ttr_e2e_awal`, `ttr_after_reduksi`, `eviden`, `catatan_sda`, `validasi_sda`, `approved_not_ppq`, `rep_rec`, `change_to`, `level_acc`, `reject_reason`, `last_updated`) VALUES
(2, 'INC001', 'customer', 'VPNIP', 'Kategoriddwr', 'REG-5', 'Madiun', 'reduksi', 'reason1', '12.5', '14.6', 'h39.jpg', 'wso\r\n', '', '', '', '', 'reject', 'Bla Bla Bla', '2024-10-14 09:01:13'),
(3, 'INC001', 'CustA', 'ASTINET', 'Kategori', 'regional1', 'Malang', 'exclude', 'reason1', '10days', '', '1725870560518.png', '', '', '', '11', '', 'reject', 'wdwdwd', '2024-10-14 09:06:49'),
(4, 'INC001', 'CustA', 'WIFI', 'Kategori1', 'regional1', 'Surabaya Utara', 'exclude', 'reason1', '10days', '', '1725870574772.jpg', '', '', '', '', '', 'reject', 'wow', '2024-10-14 09:01:13'),
(5, 'INC001', 'CustA', 'INTERNET', 'Kategori1', 'regional1', 'Madiun', 'exclude', 'reason1', '10days', '0.0', '1725870672926.jpg', '', '', '', '', '', 'approve', NULL, '2024-10-14 09:42:11'),
(7, 'INC001', 'CustA', 'VOICE', 'Kategori1', 'regional1', 'Surabaya Utara', 'exclude', 'reason1', '10days', '12.4', '', '', '', '', '', '', 'approve', NULL, '2024-10-14 09:01:13'),
(10, 'INC001', 'CustA', 'IPTV', 'Kategori1', 'regional1', 'Surabaya Utara', 'exclude', 'reason1', '10days', '0.7', '1727166595475.jpg', '', '', '', '', '', 'approve', NULL, '2024-10-14 09:01:13'),
(12, 'INC001', 'CustA', NULL, 'Kategori1', 'regional1', 'Madura', 'exclude', 'reason1', '10days', '17.8', '1728549465925.jpg', '', '', '', '', '', 'approve', NULL, '2024-10-14 09:01:13'),
(13, 'INC001', 'CustA', NULL, 'Kategori1', 'regional1', NULL, '', 'reason1', '10days', '17.9', '1727168993126.jpg', '', '', '', '', '', 'reject', NULL, '2024-10-14 09:01:13'),
(14, 'INC001', 'CustA', NULL, 'Kategori1', 'regional1', NULL, 'exclude', 'reason1', '10days', '12.3', '1727166454604.jpg', '', '', '', '', '', 'reject', 'opopo', '2024-10-14 09:01:13'),
(16, 'INC001', 'CustA', NULL, 'Kategori1', 'regional1', NULL, '', 'reason1', '10days', '17.9', '', '', '', '', '', '', 'waiting', NULL, '2024-10-14 09:01:13'),
(17, 'INC001', 'CustA', 'ASTINET', 'Kategori1', 'REG-5', 'Denpasar', 'exclude', 'reason1', '10days', '17.9', 'h58.png', '', '', '', '', '', 'waiting', NULL, '2024-10-14 09:07:43'),
(18, 'INC001', 'CustA', NULL, 'Kategori1', 'REG-5', '', '', 'reason1', '10days', '17.9', '', '', '', '', '', '', 'approve', NULL, '2024-10-14 09:01:13'),
(19, 'INC001', 'CustA', NULL, 'Kategori1', 'REG-5', 'Surabaya Utara', 'exclude', 'reason1', '10days', '17.9', '', 'iya ', '', '', '', '', 'waiting', NULL, '2024-10-14 09:01:13'),
(20, 'INC001', 'CustA', 'IPTV', 'Kategori1', 'REG-5', 'Surabaya Utara', '', 'reason1', '10days', '17.9', '', '', '', '', '', '', 'waiting', NULL, '2024-10-14 09:01:13'),
(21, 'INC001', 'CustA', 'INTERNET', 'Kategori1', 'REG-5', 'Madura', 'exclude', 'reason1', '10days', '17.9', '', '', '', '', '', '', 'waiting', NULL, '2024-10-14 09:57:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level_users` enum('users','superusers','admin','superadmin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `username`, `email`, `password`, `level_users`) VALUES
(1, '1', '1@g', '$2b$10$tpLqvQoV1mdWVzXlwHmUwuZDwVQ.8GSKo8PoN8ZVPO2nv9IPKcO3m', 'users'),
(2, 'Admin', 'admin@admin', '$2b$10$jvxahjrkx/UmVp8YEZeXp.G/Abe516nRtJe0e4B.6EoLHmoFUUPli', 'admin'),
(3, 'Super', 'super@super', '$2b$10$iilYqDX32.nhHKeUtnG3S.e6amnSxhICpTncY5vdrmY7t875xQj9C', 'superadmin'),
(4, 'Witel', 'wit@g', '$2b$10$qRpTzMokSBSNnWjbiRukLOGH5e9veGtVWie7ZtHicNpIRefoz5C9K', 'superusers'),
(5, 'contoh', 'contoh@gmail.com', '$2b$10$GdVTal2wZcH9GgGoav/WY.CgXcckneOjAF3G8UB9PrqnlVZKWTwnq', 'superadmin'),
(6, 'super', 'admin@super', '$2b$10$NhPqKNxyHj.GVy1Bw3mqhurcjyKduA9V3M5snbCc7YNTziSPUTddq', 'superadmin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rekon`
--
ALTER TABLE `rekon`
  ADD PRIMARY KEY (`id_rekon`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rekon`
--
ALTER TABLE `rekon`
  MODIFY `id_rekon` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
