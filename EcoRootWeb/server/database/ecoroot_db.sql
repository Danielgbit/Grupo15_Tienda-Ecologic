-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2023 a las 18:04:11
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecoroot_db`

DROP DATABASE IF EXISTS `ecoroot_db`;
CREATE DATABASE `ecoroot_db`;
USE ecoroot_db;
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`) VALUES
(1, 'EcoLife'),
(2, 'GreenEarth'),
(3, 'NaturePlus'),
(4, 'EcoFriendly'),
(5, 'EarthSaver'),
(6, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`) VALUES
(5, '57c002a5-76d4-414c-b510-78b82f037a18'),
(7, '69abb4e1-8b53-43c2-89b2-1f27dbb1b9be'),
(6, 'd22618ff-56ad-497f-8353-c6f53877a628'),
(8, 'f5e06233-da88-45f3-9253-75e2297504ed'),
(3, 'f9e5a34f-5f0a-4128-825d-eb2fe05f0a6f');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` enum('Cuidado personal','Moda','Hogar','Joyería') NOT NULL,
  `image` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `image`) VALUES
(2, 'Moda', 'moda.png'),
(3, 'Hogar', 'planet.png'),
(4, 'Joyería', 'joyeria.png'),
(5, 'Cuidado personal', 'personal.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `color_id` int(11) NOT NULL,
  `color_name` varchar(50) NOT NULL,
  `hex_code` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`color_id`, `color_name`, `hex_code`) VALUES
(1, 'Sin color', '#000000'),
(2, 'Verde', '#00FF00'),
(3, 'Azul', '#0000FF'),
(4, 'Amarillo', '#FFFF00'),
(5, 'Naranja', '#FFA500'),
(6, 'Rosa', '#FFC0CB'),
(7, 'Violeta', '#800080'),
(8, 'Negro', '#000000'),
(9, 'Blanco', '#FFFFFF'),
(10, 'Gris', '#808080'),
(11, 'Rojo', '#FF0000'),
(12, 'Marrón', '#A52A2A'),
(13, 'Celeste', '#87CEEB'),
(14, 'Dorado', '#FFD700'),
(15, 'Plateado', '#C0C0C0'),
(16, 'Lavanda', '#E6E6FA'),
(17, 'Turquesa', '#40E0D0'),
(18, 'Salmon', '#FA8072'),
(19, 'Verde Lima', '#32CD32'),
(20, 'Cian', '#00FFFF'),
(21, 'Magenta', '#FF00FF'),
(22, 'Turquesa Medio', '#48D1CC'),
(23, 'Amarillo Limón', '#FFF44F'),
(24, 'Malva', '#AF4E81'),
(25, 'Azul Medianoche', '#191970'),
(26, 'Naranja Oscuro', '#FF4500'),
(27, 'Púrpura Oscuro', '#9400D3'),
(28, 'Verde Pino', '#01796F'),
(29, 'Turquesa Oscuro', '#00CED1'),
(30, 'Granate', '#800000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`order_id`, `order_date`, `user_id`) VALUES
(212, '2023-11-23 23:51:57', '57c002a5-76d4-414c-b510-78b82f037a18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_product`
--

CREATE TABLE `order_product` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `order_product`
--

INSERT INTO `order_product` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(202, 212, 53, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `united` int(11) DEFAULT NULL,
  `discount` decimal(4,2) NOT NULL,
  `material` varchar(30) DEFAULT NULL,
  `state` enum('New','Used') DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `color_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `united`, `discount`, `material`, `state`, `user_id`, `image`, `color_id`, `category_id`, `brand_id`) VALUES
(49, 'Cepillo', 'La Pomada Regeneradora de Caléndula Color-1 elimina las células muertas y suaviza la piel descongestionándola y manteniendo su hidratacíon.', 18.00, 8, 5.00, 'Romero, Calendula', 'Used', 'f9e5a34f-5f0a-4128-825d-eb2fe05f0a6f', 'img-product-1699996664323.jpg', 10, 4, 4),
(53, 'Toalla Biodegradable', 'Las toallas biodegradables son un tipo de toallas que están compuestas en su totalidad por celulosa y/o algodón y que pueden ser desechadas tras hacer uso de ellas. De ahí que en los últimos años la demanda por este producto haya aumentado considerablemen', 20.00, 2, 5.00, 'Algodon', 'New', '57c002a5-76d4-414c-b510-78b82f037a18', 'img-product-1700783468589.jpg', 13, 2, 3),
(54, 'Cepillo De Bambú', 'Prueba el nuevo cepillo', 33.00, 3, 3.00, 'Bambu', 'New', 'd22618ff-56ad-497f-8353-c6f53877a628', 'img-product-1700785895604.jpg', 13, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_cart`
--

CREATE TABLE `product_cart` (
  `product_cart_id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_cart`
--

INSERT INTO `product_cart` (`product_cart_id`, `cart_id`, `product_id`, `quantity`) VALUES
(20, 3, 49, 10),
(36, 5, 53, 1),
(38, 6, 54, 1),
(39, 6, 53, 1),
(40, 6, 49, 1),
(45, 8, 54, 1),
(46, 8, 53, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_color`
--

CREATE TABLE `product_color` (
  `product_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_color`
--

INSERT INTO `product_color` (`product_id`, `color_id`) VALUES
(49, 12),
(53, 13),
(54, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quantity_productcategory`
--

CREATE TABLE `quantity_productcategory` (
  `category_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `quantity_productcategory`
--

INSERT INTO `quantity_productcategory` (`category_id`, `quantity`) VALUES
(3, 2),
(5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` char(36) NOT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `gender` enum('female','male','other') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `email`, `password`, `avatar`, `country`, `city`, `address`, `birthDate`, `gender`) VALUES
('57c002a5-76d4-414c-b510-78b82f037a18', 'Federico', 'Gonzalo', 'Fede', 'Federico@gmail.com', '$2b$10$xU8uoAu/TJ/FuI.sevPSKOFqdO.LXP7EW0aPP0AqRGKd9S7k8DNwS', 'avatar-1700776075230.jpg', 'San Marino', 'Medellin', 'Av40#60-2', '2023-10-31', 'male'),
('69abb4e1-8b53-43c2-89b2-1f27dbb1b9be', 'Valentina', 'Soto', 'Juli', 'Juliana@gmail.com', '$2b$10$Er8GT4QvvwIZKCPdZ936FemLHNIm3EddaUi8xkWdgdPFhVYeRtRmm', 'avatar-1699647738821.jpg', 'Barbados', 'Colombia', 'Av-70#40', '1995-02-20', 'female'),
('7241d05b-2b56-453d-b540-53b3807b99d0', 'Carrazca', 'Gaviria', 'Carrazca', 'Carrazca@gmail.com', '$2b$10$PlxJ2UvMX5F1GsAQde.yW.m/VUqkhiaa8ybeG0c7BXtrhf1.T/etm', 'avatar-1700588476046.jpg', 'Argentina', 'Buenos Aires', 'Av 40-#60', '1980-10-03', 'male'),
('b7ef1eac-f050-4b35-9ab9-f7ad851f6205', 'Yolanda', 'Fernandez', 'Yola', 'Yolanda@gmail.com', '$2b$10$j5sovIMEdkrS2b3VpUDBX.63t4Ahr1e/veTnKti96lsRf7R.k1Hta', 'avatar-1699647038113.jpg', 'Medellin', 'Colombia', 'Calle20#60-1', '1990-02-20', 'female'),
('d22618ff-56ad-497f-8353-c6f53877a628', 'Jose Alvarez', 'Carrazca', 'Jose', 'Jose@gmail.com', '$2b$10$Ql2kOVePzPsX31EFSXmDH.savNiPx/4Oyc42VaMhowz9ABTxhwDiy', 'avatar-1700786047911.jpg', 'Hong Kong', 'Medellin', 'ss22#A', '2023-11-01', 'male'),
('f5e06233-da88-45f3-9253-75e2297504ed', 'Alejandra', 'Osorio', 'Aleja', 'Alejandra@gmail.com', '$2b$10$Zp6pkbbeV5pw.qebtXoFVua4Df0iOMs671HcWYXNEBBzlndIIJ.sm', 'avatar-1699648226177.jpg', 'Argentina', 'Buenos Aires', 'Av 40-#60', '1980-10-03', 'female'),
('f8a6b594-e8b4-453d-acb9-b2b6d0075473', 'Valeria', 'Giraldo', 'Vale', 'Valeria@gmail.com', '$2b$10$JkhM9nHA9f.x8xiHV0JCuO4UytCVmBferPougtjOiTTjpHdcIxCaK', 'avatar-1700593636328.jpg', 'Antigua and Barbuda', 'Medellin', 'ss22#A', '2023-10-30', 'female'),
('f9e5a34f-5f0a-4128-825d-eb2fe05f0a6f', 'Eliana', 'Vazquez', 'Vale', 'Valen@gmail.com', '$2b$10$qQi0EVRsmn4cLIdBytCDiOwy32GPcNlLA7IqeFfwc.tLVjlSSye8a', 'avatar-1700599103691.jpg', 'Colombia', 'Medellin', 'ss22#A', '2007-02-22', 'male');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`color_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `fk_products_colors` (`color_id`);

--
-- Indices de la tabla `product_cart`
--
ALTER TABLE `product_cart`
  ADD PRIMARY KEY (`product_cart_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`product_id`,`color_id`),
  ADD KEY `color_id` (`color_id`);

--
-- Indices de la tabla `quantity_productcategory`
--
ALTER TABLE `quantity_productcategory`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);
ALTER TABLE `users` ADD FULLTEXT KEY `password` (`password`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `colors`
--
ALTER TABLE `colors`
  MODIFY `color_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT de la tabla `order_product`
--
ALTER TABLE `order_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `product_cart`
--
ALTER TABLE `product_cart`
  MODIFY `product_cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_colors` FOREIGN KEY (`color_id`) REFERENCES `colors` (`color_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`);

--
-- Filtros para la tabla `product_cart`
--
ALTER TABLE `product_cart`
  ADD CONSTRAINT `product_cart_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`),
  ADD CONSTRAINT `product_cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Filtros para la tabla `product_color`
--
ALTER TABLE `product_color`
  ADD CONSTRAINT `product_color_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_color_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `product_color_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`color_id`);

--
-- Filtros para la tabla `quantity_productcategory`
--
ALTER TABLE `quantity_productcategory`
  ADD CONSTRAINT `quantity_productcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
