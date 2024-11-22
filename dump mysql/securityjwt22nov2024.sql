-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 22 nov. 2024 à 08:44
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
-- Base de données : `securityjwt`
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `concerts`
--

INSERT INTO `concerts` (`id`, `date`, `description`, `heure`, `image`, `nom`, `origine`, `scene`, `lien`) VALUES
(1, '16 Juin', 'Ce projet musical suisse puise son énergie dans les arpèges violents et dissonants du Black Metal et des sons froids de la musique industrielle.', '20:00', 'https://www.verdammnis.com/img/uploads/2024/08/versatile.jpeg', 'Versatile', 'Europe', 'nord', 'https://www.versatilemetalband.com/'),
(3, '15 Juin', 'NAPALM DEATH est un groupe de metal extrême dont le nom est synonyme de musique lourde poussée à son paroxysme.', '21:00', 'https://www.metalzone.fr/wp-content/uploads/2023/09/NAPALMDEATH_MOTOC23-19-768x512.jpg', 'Napalm death', 'Europe', 'principale', 'https://napalmdeath.org/'),
(4, '16 Juin', 'Babymetal, stylisé BABYMETAL, est un groupe de J-pop et heavy metal japonais, originaire de Tokyo. Formé en 2010, il est composé de trois jeunes idoles japonaises et produit par l\'agence de talent Amuse, Inc.', '18:00', 'https://www.metalzone.fr/wp-content/uploads/2019/07/Babymetal.jpg', 'Babymetal', 'Asie', 'sud', 'https://babymetal.com/mob/index.php?site=TO&ima=2604'),
(9, '14 juin', 'Arka\'n Asrafokor, un groupe de métal africain, est reconnu comme un précurseur dans la scène musicale du continent.', '18:00', 'https://www.prime-tours.com/site/assets/files/4779/72152315_3507262379291527_923094037911568384_n.-hero.jpg', 'Arka’n Asrafokor', 'Afrique', 'ouest', 'https://www.facebook.com/arkanasrafokor/?locale=fr_FR'),
(10, '14 juin', 'De riffs destructeurs en tensions qui éclatent orages de distorsions, Great Falls portent somme toute très bien leur nom.', '20:00', 'https://www.brooklynvegan.com/wp-content/uploads/2023/02/20/attachment-great-falls.jpeg', 'Great Falls', 'Amerique', 'principale', 'https://www.facebook.com/GreatFallsNoise/'),
(13, '15 juin', 'test 2', '21:00', 'https://i.ebayimg.com/images/g/iF0AAOSw6x9i5MMT/s-l1200.png', 'luc', 'Australie', 'sud', NULL),
(15, '14 Juin', 'Here is a short description...', '20:00', 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg', 'The artist', 'Europ', 'nord', 'https://images.pexels.com');

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `infos`
--

INSERT INTO `infos` (`id`, `important`, `message`) VALUES
(2, b'0', 'Vente de goodies le 13 juin à partir de 14h au point d\'information'),
(3, b'0', 'METEO: demain 14 juin ensoleillé 28C avec légère brise'),
(4, b'1', 'ACCES SCENE NORD: bloqué pour 15 min suite à un malaise'),
(13, b'0', 'Rencontre avec Arka’n Asrafokor le  13 juin de 16 à 18h scène Sud '),
(14, b'0', 'Rencontre avec BABYMETAL le  14 juin de 16 à 18h scène Est ');

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(10, 'Scène disposant d\'un écran géant', 48.8372, '', 2.4417, 'Scene principale', 'scene'),
(17, 'boutique du festival', 48.8383, '', 2.4451, 'boutique', 'informations'),
(27, 'toilettes publiques', 48.8355, '', 2.44457, 'toilettes 1', 'scene'),
(28, 'toilettes publiques', 48.8369, '', 2.44276, 'toilettes 3', 'toilettes');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` enum('ROLE_ADMIN','ROLE_EDITOR','ROLE_NONE','ROLE_VIEWER') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_VIEWER'),
(2, 'ROLE_EDITOR'),
(3, 'ROLE_ADMIN'),
(4, 'ROLE_NONE');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`) VALUES
(1, 'foo@foo.foo', '$2a$10$64dKMkcyQlCTyw32QVukl.5ottg.ibEvyqvo5YV5S/pw1gt0qdXFe', 'superuser'),
(2, 'foo1@foo.foo', '$2a$10$jqA6S6FNI.RTgfP5RvzpbOUKpB/DT3zgKSGDUMNJjq72f6ni21tyC', 'viewer'),
(3, 'foo2@foo.foo', '$2a$10$xHmiKoz/u4JExG66IrhoB.xsMNdz3pWVrDiagL48.hr0TX65Ooxym', 'editor'),
(4, 'foo3@foo.foo', '$2a$10$nIA2nrby2DujxHmY6wOoweDjjHL7GJVLKjYoewWMN3EAhVb1lBj3O', 'admin'),
(5, 'hy@i.ti', '$2a$10$Rg0HOh9EdRCvhHc9JVo1SOwishpbW4uYFLPwx8Vfrn8k49XJAatmS', 'test');

-- --------------------------------------------------------

--
-- Structure de la table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(1, 2),
(3, 2),
(1, 3),
(4, 3),
(1, 4),
(5, 4);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
