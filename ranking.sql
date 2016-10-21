-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 21-10-2016 a las 16:52:41
-- Versión del servidor: 5.7.15-0ubuntu0.16.04.1
-- Versión de PHP: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ranking`
--
CREATE DATABASE IF NOT EXISTS `ranking` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ranking`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CALIFICACIONES`
--

CREATE TABLE `CALIFICACIONES` (
  `id_empresa` int(11) NOT NULL,
  `DNI` int(11) NOT NULL,
  `puntuacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EMPRESAS`
--

CREATE TABLE `EMPRESAS` (
  `id_empresa` int(11) NOT NULL,
  `nombre` text CHARACTER SET utf8
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIOS`
--

CREATE TABLE `USUARIOS` (
  `DNI` int(8) NOT NULL,
  `nombre` text CHARACTER SET utf8,
  `apellidos` text CHARACTER SET utf8,
  `clave` text CHARACTER SET utf8 NOT NULL,
  `email` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_Calificaciones`
--
CREATE TABLE `vista_Calificaciones` (
`nombre` text
,`puntuacion` decimal(36,4)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_votoEmpresas`
--
CREATE TABLE `vista_votoEmpresas` (
`id` int(11)
,`nombre` text
,`DNI` int(11)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_Calificaciones`
--
DROP TABLE IF EXISTS `vista_Calificaciones`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_Calificaciones`  AS  select `EMPRESAS`.`nombre` AS `nombre`,(sum(`CALIFICACIONES`.`puntuacion`) / count(`CALIFICACIONES`.`id_empresa`)) AS `puntuacion` from (`EMPRESAS` join `CALIFICACIONES` on((`EMPRESAS`.`id_empresa` = `CALIFICACIONES`.`id_empresa`))) group by `EMPRESAS`.`id_empresa` order by `puntuacion` desc ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_votoEmpresas`
--
DROP TABLE IF EXISTS `vista_votoEmpresas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_votoEmpresas`  AS  select `EMPRESAS`.`id_empresa` AS `id`,`EMPRESAS`.`nombre` AS `nombre`,`CALIFICACIONES`.`DNI` AS `DNI` from (`CALIFICACIONES` join `EMPRESAS` on((`EMPRESAS`.`id_empresa` = `CALIFICACIONES`.`id_empresa`))) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `CALIFICACIONES`
--
ALTER TABLE `CALIFICACIONES`
  ADD PRIMARY KEY (`id_empresa`,`DNI`),
  ADD KEY `DNI` (`DNI`);

--
-- Indices de la tabla `EMPRESAS`
--
ALTER TABLE `EMPRESAS`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  ADD PRIMARY KEY (`DNI`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `EMPRESAS`
--
ALTER TABLE `EMPRESAS`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
