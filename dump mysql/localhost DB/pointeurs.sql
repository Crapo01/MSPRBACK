-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 05 nov. 2024 à 09:14
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
-- Structure de la table `pointeurs`
--

DROP TABLE IF EXISTS `pointeurs`;
CREATE TABLE IF NOT EXISTS `pointeurs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `lat` float NOT NULL,
  `lien` varchar(255) DEFAULT NULL,
  `lon` float NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pointeurs`
--

INSERT INTO `pointeurs` (`id`, `description`, `lat`, `lien`, `lon`, `nom`, `type`) VALUES
(1, 'point de rencontre, infos et poste de secours', 48.8384, 'https://www.ratp.fr/', 2.4433, 'Acceuil et urgences médicales', 'informations'),
(2, 'ouvert tous les jours de 18h à minuit', 48.8392, 'https://www.instagram.com/dim.sum.foodtruck/', 2.4418, 'Dimsum', 'alimentation'),
(3, 'ouvert tous les jours de 18h à minuit', 48.8383, 'https://letapastruck.fr/', 2.4412, 'Tapastruck', 'alimentation'),
(4, 'toilettes publiques', 48.8398, '', 2.4407, 'Toilettes 2', 'toilettes'),
(6, '', 48.8394, '', 2.4426, 'Scene nord', 'scene'),
(7, '', 48.8398, '', 2.4391, 'Scene ouest', 'scene'),
(8, '', 48.8371, '', 2.4465, 'Scene est', 'scene'),
(9, '', 48.8345, '', 2.4462, 'Scene sud', 'scene'),
(10, 'Scène disposant d\'un écran géant', 48.8372, '', 2.4417, 'Scene principale', 'scene');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
