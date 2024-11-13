-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 05 nov. 2024 à 09:16
-- Version du serveur : 8.3.0
-- Version de PHP : 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nationsound`
--

-- --------------------------------------------------------

--
-- Structure de la table `infos`
--

DROP TABLE IF EXISTS `infos`;
CREATE TABLE IF NOT EXISTS `infos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `important` bit(1) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `infos`
--

INSERT INTO `infos` (`id`, `important`, `message`) VALUES
(2, b'0', 'Vente de goodies le 13 juin à partir de 14h au point d\'information'),
(3, b'0', 'METEO: demain 14 juin ensoleillé 28C avec légère brise'),
(4, b'1', 'ACCES SCENE NORD: bloqué pour 15 min suite à un malaise'),
(13, b'0', 'Rencontre avec Arka’n Asrafokor le  13 juin de 16 à 18h scène Sud '),
(14, b'0', 'Rencontre avec BABYMETAL le  14 juin de 16 à 18h scène Est ');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
