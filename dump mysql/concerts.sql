-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 05 nov. 2024 à 09:15
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
-- Structure de la table `concerts`
--

DROP TABLE IF EXISTS `concerts`;
CREATE TABLE IF NOT EXISTS `concerts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `heure` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `origine` varchar(255) DEFAULT NULL,
  `scene` varchar(255) DEFAULT NULL,
  `lien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `concerts`
--

INSERT INTO `concerts` (`id`, `date`, `description`, `heure`, `image`, `nom`, `origine`, `scene`, `lien`) VALUES
(1, '16 Juin', 'Ce projet musical suisse puise son énergie dans les arpèges violents et dissonants du Black Metal et des sons froids de la musique industrielle.', '20:00', 'https://www.verdammnis.com/img/uploads/2024/08/versatile.jpeg', 'Versatile', 'Europe', 'nord', 'https://www.versatilemetalband.com/'),
(3, '15 Juin', 'NAPALM DEATH est un groupe de metal extrême dont le nom est synonyme de musique lourde poussée à son paroxysme.', '21:00', 'https://www.metalzone.fr/wp-content/uploads/2023/09/NAPALMDEATH_MOTOC23-19-768x512.jpg', 'Napalm death', 'Europe', 'principale', 'https://napalmdeath.org/'),
(4, '16 Juin', 'Babymetal, stylisé BABYMETAL, est un groupe de J-pop et heavy metal japonais, originaire de Tokyo. Formé en 2010, il est composé de trois jeunes idoles japonaises et produit par l\'agence de talent Amuse, Inc.', '18:00', 'https://www.metalzone.fr/wp-content/uploads/2019/07/Babymetal.jpg', 'Babymetal', 'Asie', 'sud', 'https://babymetal.com/mob/index.php?site=TO&ima=2604'),
(9, '14 juin', 'Arka\'n Asrafokor, un groupe de métal africain, est reconnu comme un précurseur dans la scène musicale du continent.', '18:00', 'https://www.prime-tours.com/site/assets/files/4779/72152315_3507262379291527_923094037911568384_n.-hero.jpg', 'Arka’n Asrafokor', 'Afrique', 'ouest', 'https://www.facebook.com/arkanasrafokor/?locale=fr_FR'),
(10, '14 juin', 'De riffs destructeurs en tensions qui éclatent orages de distorsions, Great Falls portent somme toute très bien leur nom.', '20:00', 'https://www.brooklynvegan.com/wp-content/uploads/2023/02/20/attachment-great-falls.jpeg', 'Great Falls', 'Amerique', 'principale', 'https://www.facebook.com/GreatFallsNoise/');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
