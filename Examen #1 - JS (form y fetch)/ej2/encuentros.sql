-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2018 a las 06:48:22
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `encuentros`
--
/*DROP DATABASE IF EXISTS `encuentros`;*/
CREATE DATABASE IF NOT EXISTS `encuentros` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `encuentros`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuentros`
--

DROP TABLE IF EXISTS `encuentros`;
CREATE TABLE `encuentros` (
  `idx` int(8) NOT NULL,
  `cat` varchar(16) COLLATE utf8_spanish_ci NOT NULL,
  `choice1` varchar(16) COLLATE utf8_spanish_ci NOT NULL,
  `choice2` varchar(16) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

DROP TABLE IF EXISTS `equipos`;
CREATE TABLE `equipos` (
  `idx` int(8) NOT NULL,
  `name` varchar(16) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`idx`, `name`) VALUES
(1, 'New Team'),
(2, 'Old Boys'),
(3, 'Green Valley'),
(4, 'Blue Sea'),
(5, 'Young oldies');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `individuales`
--

DROP TABLE IF EXISTS `individuales`;
CREATE TABLE `individuales` (
  `idx` int(8) NOT NULL,
  `name` varchar(16) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `individuales`
--

INSERT INTO `individuales` (`idx`, `name`) VALUES
(1, 'Falconi'),
(2, 'Goku'),
(3, 'Obama'),
(4, 'Binladen'),
(5, 'Rajoy'),
(6, 'Gasol');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encuentros`
--
ALTER TABLE `encuentros`
  ADD PRIMARY KEY (`idx`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`idx`);

--
-- Indices de la tabla `individuales`
--
ALTER TABLE `individuales`
  ADD PRIMARY KEY (`idx`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encuentros`
--
ALTER TABLE `encuentros`
  MODIFY `idx` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `idx` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `individuales`
--
ALTER TABLE `individuales`
  MODIFY `idx` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
