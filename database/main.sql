CREATE DATABASE `ricardoting`;

USE `ricardoting`;

CREATE TABLE IF NOT EXISTS `servicios`(
    `id_servicio` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(25) NOT NULL,
    `tipo` VARCHAR(25) NOT NULL,
    `descripcion` VARCHAR(200) NOT NULL,
    `precio` DECIMAL(9, 3) NOT NULL,
    `imagen` VARCHAR(225) NOT NULL,
    PRIMARY KEY(`id_servicio`)
);

CREATE TABLE IF NOT EXISTS `ordenes` (
    `id_orden` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_usuario` INT UNSIGNED NOT NULL,
    `id_servicio` INT UNSIGNED NOT NULL,
    `ordenes_dato` DATETIME DEFAULT UTC_TIMESTAMP() NOT NULL,
    `detalles` VARCHAR(120) NOT NULL,
    `precio_total` DECIMAL(9, 2) NOT NULL,
    PRIMARY KEY(`id_orden`)
);

CREATE TABLE IF NOT EXISTS `usuario` (
    `id_usuario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(25) NOT NULL,
    `email` VARCHAR(25) NOT NULL,
    `contraseña` VARCHAR(25) NOT NULL,
    `esadministrador` BOOLEAN DEFAULT 0,
    PRIMARY KEY(`id_usuario`)
);

CREATE TABLE IF NOT EXISTS `planes`(
    `id_planes` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(25) NOT NULL,
    `precio` DECIMAL(9, 2) NOT NULL,
    PRIMARY KEY(`id_planes`)
);

CREATE TABLE IF NOT EXISTS `plan_detalles`(
    `id_detalle` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_planes` INT UNSIGNED NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    PRIMARY KEY(`id_detalle`),
    FOREIGN KEY(`id_planes`) REFERENCES `planes`(`id_planes`)
);

CREATE TABLE IF NOT EXISTS `socios`(
    `id_socios` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(25) NOT NULL,
    `imagen` VARCHAR(225) NOT NULL,
    PRIMARY KEY(`id_socios`)
);

CREATE TABLE IF NOT EXISTS `areas`(
    `id_area` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(25) NOT NULL,
    PRIMARY KEY(`id_area`)
);

CREATE TABLE IF NOT EXISTS `mensajes`(
    `id_mensaje` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_usuario` INT UNSIGNED NOT NULL,
    `mensaje` VARCHAR(225) NOT NULL,
    `mensaje_creado` DATETIME DEFAULT UTC_TIMESTAMP() NOT NULL,
    PRIMARY KEY(`id_mensaje`),
    FOREIGN KEY(`id_usuario`) REFERENCES `usuario`(`id_usuario`)
);

-- Informaciòn

INSERT INTO `servicios` (`titulo`,`tipo`,`descripcion`,`precio`,`imagen`) 
VALUES 
(
    'Servicio de Fotografia','mediamarket','Tenemos planes de fotografia que te gustaria',100.000,'uploads/fotografia.jpg'
),(
    'Comunity Manager','Administrar redes','Controlamos tus redes sociales para un mayor alcance con tus seguidores/Clientes',150.500,'uploads/comunity.png'
),(
    'Publicidad en Podcast','publicidad','En nuestro espacio publicitario nombramos tu empresa',300.000,'uploads/podcast.jpg'
);

INSERT INTO `planes`(`tipo`,
    `precio`
) VALUES (
    'Master',25.000
),(
    'Normal',55.000
),(
    'Jumbo',99.000
);

INSERT INTO `plan_detalles`(
    `id_planes`,
    `nombre`
) VALUE (
    1,'20 Fotografias'
),(
    1, '5 Tematicas de fondo'
),(
    1, '4 trajes'
),(
    2,'30 Fotografias'
),(
    2,'10 teamticas de fondo'
),(
    2,'8 trajes'
),(
    3,'40 Fotografias'
),(
    3,'15 tematicas de fondo'
),(
    3,'12 trajes'
);

INSERT INTO `socios`(
    `nombre`,
    `imagen`
) VALUES (
    'PixaBay','uploads/pixabay.png'
),(
    'Google','uploads/pexels.png'
),(
    'Instagram','uploads/insta.jpg'
);


    
    


