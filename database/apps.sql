-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 15, 2024 at 08:48 AM
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
  `layanan` varchar(255) DEFAULT NULL COMMENT 'diisi sesuai kolom service type laporan DSO',
  `kategori` varchar(255) DEFAULT NULL COMMENT 'diisi hanya untuk layanan datin, jika bukan layanan datin abaikan saja',
  `regional` varchar(255) DEFAULT NULL,
  `witel` varchar(255) DEFAULT NULL,
  `jenis_permintaan` varchar(255) DEFAULT NULL COMMENT 'diisi EXCLUDE or REDUKSI, sesuai dengan pengajuan',
  `reason` varchar(255) DEFAULT NULL,
  `ttr_e2e_awal` varchar(255) DEFAULT NULL,
  `ttr_after_reduksi` varchar(255) DEFAULT NULL COMMENT 'diisi apabila permintaan REDUKSI dan wajib isi angka desimal, jika pengajuan EXCLUDE diabaikan',
  `eviden_regional` varchar(255) DEFAULT NULL,
  `catatan_sda` varchar(255) DEFAULT NULL,
  `validasi_sda` varchar(255) DEFAULT NULL,
  `approved_not_ppq` varchar(255) DEFAULT NULL,
  `rep_rec` varchar(255) DEFAULT NULL COMMENT 'khusus untuk K1 DATIN saja, apabila ada perubahan REPAIR atau RECOVERY',
  `change_to` varchar(255) DEFAULT NULL COMMENT 'diisi apabila pengajuan EXCLUDE ke OTHERSIDE, jika REDUKSI diabaikan',
  `level_acc` enum('kosong','approve','reject') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rekon`
--

INSERT INTO `rekon` (`id_rekon`, `incident`, `customer`, `layanan`, `kategori`, `regional`, `witel`, `jenis_permintaan`, `reason`, `ttr_e2e_awal`, `ttr_after_reduksi`, `eviden_regional`, `catatan_sda`, `validasi_sda`, `approved_not_ppq`, `rep_rec`, `change_to`, `level_acc`) VALUES
(1, 'INC001', 'CustA', 'Layanan1', 'Kategori1', 'regional1', 'witel1', 'permintaan1', 'reason1', '10days', '5days', 'evidence1', 'notedA', 'valid', 'Approve', 'RepA', 'Change1', 'approve');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level_users` enum('users','admin','superadmin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `username`, `email`, `password`, `level_users`) VALUES
(1, '1', '1@g', '$2b$10$tpLqvQoV1mdWVzXlwHmUwuZDwVQ.8GSKo8PoN8ZVPO2nv9IPKcO3m', 'users'),
(2, 'Admin', 'admin@admin', '$2b$10$jvxahjrkx/UmVp8YEZeXp.G/Abe516nRtJe0e4B.6EoLHmoFUUPli', 'admin'),
(3, 'Super', 'super@super', '$2b$10$iilYqDX32.nhHKeUtnG3S.e6amnSxhICpTncY5vdrmY7t875xQj9C', 'superadmin');

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
  MODIFY `id_rekon` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
