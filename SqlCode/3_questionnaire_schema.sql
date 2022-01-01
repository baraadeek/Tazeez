CREATE TABLE tazeez.`questionairetemplate` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `CreatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

------------------------------------

CREATE TABLE tazeez.`questionairetemplatequestion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Question` mediumtext,
  `QuestionaireTemplateId` int(11) DEFAULT NULL,
  `QuestionaireQuestionTypeId` int(11) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT '0',
  `CreatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `IsOptional` tinyint(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `AssessmentTemplateQuestion_QuestionaireTemplateId_idx` (`QuestionaireTemplateId`),
  CONSTRAINT `AssessmentTemplateQuestion_QuestionaireTemplateId` FOREIGN KEY (`QuestionaireTemplateId`) REFERENCES `questionairetemplate` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `tazeez`.`questionairetemplatequestion` 
ADD INDEX `AssessmentTemplateQuestion_QuestionaireTemplateId_idx` (`QuestionaireTemplateId` ASC);
;
ALTER TABLE `tazeez`.`questionairetemplatequestion` 
ADD CONSTRAINT `AssessmentTemplateQuestion_QuestionaireTemplateId`
  FOREIGN KEY (`QuestionaireTemplateId`)
  REFERENCES `tazeez`.`questionairetemplate` (`Id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
--------------------------------------------

