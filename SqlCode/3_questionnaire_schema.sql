CREATE TABLE `tazeez`.`questionnairetemplate` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `CreatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-------------------------------

CREATE TABLE `tazeez`.`questionnairetemplatequestion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Question` TEXT COLLATE utf8_unicode_ci,
  `QuestionnaireTemplateId` int(11) DEFAULT NULL,
  `QuestionnaireQuestionTypeId` int(11) DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL DEFAULT '0',
  `CreatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Score` int(11) NOT NULL DEFAULT '0',
  `Archived` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `IsOptional` tinyint(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `AssessmentTemplateQuestion_QuestionnaireTemplateId_idx` (`QuestionnaireTemplateId`),
  CONSTRAINT `AssessmentTemplateQuestion_QuestionnaireTemplateId` FOREIGN KEY (`QuestionnaireTemplateId`) REFERENCES `questionnairetemplate` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

ALTER TABLE `tazeez`.`questionnairetemplatequestion` 
ADD INDEX `QuestionnaireTemplateQuestionTempId_TemplateQuestionTempId_idx` (`QuestionnaireTemplateId` ASC);
;
ALTER TABLE `tazeez`.`questionnairetemplatequestion` 
ADD CONSTRAINT `QuestionnaireTemplateQuestionTempId_TemplateQuestionTempId`
  FOREIGN KEY (`QuestionnaireTemplateId`)
  REFERENCES `tazeez`.`questionnairetemplate` (`Id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

----------------------------------------------------------------

CREATE TABLE `tazeez`.`questionnairegroup` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(500) NOT NULL,
  `CreatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` TINYINT(3) NOT NULL DEFAULT '0' ,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC));

-------------------------------------

CREATE TABLE `tazeez`.`questionnaire` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `QuestionnaireGroupId` INT(11) NOT NULL,
  `Status` INT(11) NOT NULL DEFAULT 0,
  `QuestionnaireTemplateId` INT(11) NOT NULL,
  `DueDateUTC` DATETIME NOT NULL,
  `CreatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` TINYINT(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  INDEX `GroupId_QuestionnaireGroupId_idx` (`QuestionnaireGroupId` ASC),
  INDEX `TemplateId_QuestionnaireTemplateId_idx` (`QuestionnaireTemplateId` ASC),
  CONSTRAINT `GroupId_QuestionnaireGroupId`
    FOREIGN KEY (`QuestionnaireGroupId`)
    REFERENCES `tazeez`.`questionnairegroup` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `TemplateId_QuestionnaireTemplateId`
    FOREIGN KEY (`QuestionnaireTemplateId`)
    REFERENCES `tazeez`.`questionnairetemplate` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


----------------------------------------------------------------

CREATE TABLE `tazeez`.`questionnairequestion` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `TemplateQuestionId` INT(11) NOT NULL,
  `QuestionnaireId` INT(11) NOT NULL,
  `Status` INT(11) NOT NULL DEFAULT 0,
  `CreatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` TINYINT(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  INDEX `questionnaireId_questionQuestionnaireId_idx` (`QuestionnaireId` ASC),
  INDEX `questionnaireTemplateId_questionTemplateId_idx` (`TemplateQuestionId` ASC),
  CONSTRAINT `questionnaireId_questionQuestionnaireId`
    FOREIGN KEY (`QuestionnaireId`)
    REFERENCES `tazeez`.`questionnaire` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `questionnaireTemplateId_questionTemplateId`
    FOREIGN KEY (`TemplateQuestionId`)
    REFERENCES `tazeez`.`questionnairetemplatequestion` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--------------------------------------------------------------------

CREATE TABLE `tazeez`.`questionchoice` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `TemplateQuestionId` INT(11) NOT NULL,
  `Choice` VARCHAR(55) NOT NULL,
  `DisplayOrder` INT(11) NOT NULL DEFAULT 0,
  `Score` INT(11) NOT NULL DEFAULT 0,
  `CreatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` TINYINT(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  INDEX `TemplateQuestionId_ChoiceTemplateQuestionId_idx` (`TemplateQuestionId` ASC),
  CONSTRAINT `TemplateQuestionId_ChoiceTemplateQuestionId`
    FOREIGN KEY (`TemplateQuestionId`)
    REFERENCES `tazeez`.`questionnairetemplatequestion` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);