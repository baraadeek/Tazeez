﻿CREATE SCHEMA `tazeez` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;

-----------------------------------------

CREATE TABLE `tazeez`.`User` (
	`Id` INT(11) NOT NULL AUTO_INCREMENT,
	`FirstName` VARCHAR(255) NOT NULL DEFAULT '',
	`LastName` VARCHAR(225) NOT NULL DEFAULT '',
	`Email` VARCHAR(255) NOT NULL DEFAULT '',
	`PhoneNumber` VARCHAR(45) NOT NULL DEFAULT '',
	`Password` VARCHAR(255) NOT NULL DEFAULT '',
	`City` VARCHAR(45) NOT NULL DEFAULT '',
	`Image` VARCHAR(500) NOT NULL DEFAULT '',
	`CreatedDate` timestamp Not NULL DEFAULT CURRENT_TIMESTAMP,
	`UpdateDate` timestamp not NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`Archived` tinyint(3) NOT NULL DEFAULT 0,
	`IsAdmin` tinyint(3) NOT NULL DEFAULT 0,
	PRIMARY KEY (`Id`),
	CONSTRAINT `Id_UNIQUE` UNIQUE (`Id` ASC),
	CONSTRAINT `Email_UNIQUE` UNIQUE (`Email` ASC));
  