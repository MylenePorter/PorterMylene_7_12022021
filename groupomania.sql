-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Dim 07 Mars 2021 à 01:10
-- Version du serveur :  10.1.47-MariaDB-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `posted` datetime DEFAULT NULL,
  `content` varchar(250) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `comments`
--

INSERT INTO `comments` (`id`, `posted`, `content`, `user_id`, `post_id`) VALUES
(52, '2021-03-02 15:49:54', 'Bonne idée', 32, 27),
(54, '2021-03-02 15:52:23', 'return true :)', 33, 27),
(59, '2021-03-03 18:35:58', 'Courage !', 31, 29),
(66, '2021-03-06 13:16:23', 'cool', 31, 35),
(67, '2021-03-06 13:20:13', '10 % effectué maintenant !', 32, 29),
(72, '2021-03-06 20:43:27', 'test', 41, 35);

-- --------------------------------------------------------

--
-- Structure de la table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `added` datetime DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `type` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `files`
--

INSERT INTO `files` (`id`, `added`, `name`, `type`) VALUES
(30, '2021-03-02 15:47:55', '71PWiWVi5dL1614696475752.jpg', 'image/jpeg'),
(31, '2021-03-02 15:49:40', 'ob_b41894_photo-chien-veterinaire-humour1614696580676.jpg', 'image/jpeg'),
(32, '2021-03-02 15:51:37', 'ob_c81e11_635c7f7a001d7fa8ee4bbdf3c17daa341614696697763.jpg', 'image/jpeg'),
(38, '2021-03-05 12:34:16', 'pp,840x830-pad,1000x1000,f8f8f81614944056739.jpg', 'image/jpeg'),
(39, '2021-03-06 13:17:25', 'neige1615033045364.jpg', 'image/jpeg'),
(44, '2021-03-07 00:42:44', 'expert1615074164626.jpg', 'image/jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `liked` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_id`, `liked`) VALUES
(53, 27, 32, '2021-03-02 15:49:47'),
(54, 28, 33, '2021-03-02 15:51:43'),
(55, 27, 33, '2021-03-02 15:51:44'),
(56, 29, 33, '2021-03-02 15:52:51'),
(71, 35, 31, '2021-03-05 19:32:32'),
(72, 29, 31, '2021-03-05 20:01:23'),
(73, 28, 31, '2021-03-06 13:13:46'),
(74, 36, 32, '2021-03-06 13:19:38'),
(75, 35, 32, '2021-03-06 13:19:41'),
(76, 29, 32, '2021-03-06 13:19:44'),
(82, 35, 41, '2021-03-06 20:43:22'),
(83, 41, 41, '2021-03-07 00:42:47');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `posted` datetime DEFAULT NULL,
  `content` varchar(250) DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `posts`
--

INSERT INTO `posts` (`id`, `posted`, `content`, `file_id`, `user_id`) VALUES
(27, '2021-03-02 15:47:55', 'Besoin d\'une pause café !', 30, 31),
(28, '2021-03-02 15:49:40', 'Peur du docteur !', 31, 32),
(29, '2021-03-02 15:51:37', 'Je rêve de vacances !', 32, 33),
(35, '2021-03-05 12:34:16', 'Un peu d\'humour :)', 38, 31),
(36, '2021-03-06 13:17:25', 'Un grand bol d\'air frais !', 39, 31),
(41, '2021-03-07 00:42:44', 'test', 44, 41);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `permission` enum('standard','admin') NOT NULL DEFAULT 'standard'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `password`, `first_name`, `last_name`, `email`, `created`, `permission`) VALUES
(17, '$2a$10$wJX2oZK9ahXv3Wn7FcCXFe93JAKdFzIOg3zUzPsKGiCrEjGcGIlNO', 'Super', 'Modérateur', 'mod@groupomania.site', '2021-02-24 18:26:03', 'admin'),
(31, '$2a$10$SiqpgLAwjUPD9mv9CVcp5ODPgSbws.aWM1B.0cVnn76TCz4x6Dsi2', 'Mylène', 'Porter', 'mylene@groupomania.site', '2021-03-02 15:47:26', 'standard'),
(32, '$2a$10$SiqpgLAwjUPD9mv9CVcp5ODPgSbws.aWM1B.0cVnn76TCz4x6Dsi2', 'Lucas', 'Martin', 'lucas@groupomania.site', '2021-03-02 15:48:45', 'standard'),
(33, '$2a$10$SiqpgLAwjUPD9mv9CVcp5ODPgSbws.aWM1B.0cVnn76TCz4x6Dsi2', 'Leachim', 'Retropeu', 'leachim@groupomania.site', '2021-03-02 15:50:50', 'standard'),
(41, '$2a$10$a9HXVDfek8OZjxRv7xxipuDeZTNAHoQPXZDBoVHjQK1ekDtpY3cvS', 'test', 'Test', 'test@test.com', '2021-03-06 20:41:08', 'standard');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Index pour la table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `file_id` (`file_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
--
-- AUTO_INCREMENT pour la table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
