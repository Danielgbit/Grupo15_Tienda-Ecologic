-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2023 a las 02:40:59
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
--
  DROP DATABASE IF EXISTS `ecoroot_db`;
  CREATE DATABASE `ecoroot_db`;
  USE ecoroot_db;

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
-- Estructura de tabla para la tabla `brand_category`
--

CREATE TABLE `brand_category` (
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brand_category`
--

INSERT INTO `brand_category` (`brand_id`, `category_id`) VALUES
(2, 2),
(2, 3),
(3, 3),
(3, 5);

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
(2, '8065330f-23d8-488a-9304-d3e0f0f177d7');

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
(195, '2023-10-13 21:18:50', '8065330f-23d8-488a-9304-d3e0f0f177d7'),
(196, '2023-10-13 21:26:36', '8065330f-23d8-488a-9304-d3e0f0f177d7');

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
(163, 195, 24, 4),
(164, 195, 26, 1),
(165, 196, 24, 4),
(166, 196, 26, 1);

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
(1, 'Cepillo de bambú', 'Nuestra elección consciente para el cuidado bucal y el medio ambiente. Nuestro Cepillo de Dientes de Bambú es una joya de sostenibilidad. Hecho a mano con un mango de bambú 100% biodegradable y cerdas suaves de alta calidad, este cepillo es amable con tus', 10.00, 50, 10.00, 'Bambú', 'New', '8065330f-23d8-488a-9304-d3e0f0f177d7', 'img-product-1696023650679.jpg', 1, 5, 1),
(24, 'Jabon Biodegradable', 'Prueba la frescura', 10.00, 10, 6.00, 'Avena', 'New', '8065330f-23d8-488a-9304-d3e0f0f177d7', 'img-product-1696354766733.jpg', 1, 3, 1),
(25, 'Toalla Biodegradable', 'Seca tu piel con frescura y amor cuidando la naturaleza ', 5.00, 50, 0.00, 'Algodon', 'New', '8065330f-23d8-488a-9304-d3e0f0f177d7', 'img-product-1696355124291.jpg', 9, 3, 3),
(26, 'Tónico facial', 'Producto para hidratar con elementos naturales.', 100.00, 100, 10.00, 'Albahaca, romero', 'New', '3ee7263e-73ad-4ca6-a549-a9bbe9608d62', 'img-product-1696356357075.jpg', 1, 5, 3);

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
(24, 4),
(25, 9),
(26, 1);

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
('3ee7263e-73ad-4ca6-a549-a9bbe9608d62', 'Sebastian', 'Gomez', 'Sebas', 'Sebastian@gmail.com', '$2b$10$M9mcu70YyF5.p8C65s3YTOs6Uu.nHb4v4MxGLcmL9JmOeHHJ5dpVm', 'avatar-1696286409317.jpg', 'Colombia', 'Medellin', 'ss22#A', '2001-02-22', 'male'),
('8065330f-23d8-488a-9304-d3e0f0f177d7', 'Jairito', 'Gonzalo', 'Jaiririri', 'Jairito@gmail.com', '$2b$10$.iSmN7M2bwvFDdgA//d37OkYZWHRkozqk34kOJUjWB3JDFpdfpnHe', 'avatar-1696370576532.jpg', 'Colombia', 'Medellin', 'CC#444', '1995-03-23', 'male'),
('f9e5a34f-5f0a-4128-825d-eb2fe05f0a6f', 'Eliana', 'Vazquez', 'Vale', 'Valen@gmail.com', '$2b$10$uRvC.8rXdfP5uNTdZ9jTn.rxn50rTnPVJ.4QAm.F16.POMRd1ZVQi', 'avatar-1696286200093.jpg', 'Colombia', 'Medellin', 'ss22#A', '2007-02-22', 'male');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indices de la tabla `brand_category`
--
ALTER TABLE `brand_category`
  ADD PRIMARY KEY (`brand_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

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
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT de la tabla `order_product`
--
ALTER TABLE `order_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `product_cart`
--
ALTER TABLE `product_cart`
  MODIFY `product_cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `brand_category`
--
ALTER TABLE `brand_category`
  ADD CONSTRAINT `brand_category_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`),
  ADD CONSTRAINT `brand_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
