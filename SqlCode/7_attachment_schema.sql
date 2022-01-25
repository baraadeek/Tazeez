CREATE TABLE tazeez.`attachment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `SourceId` int(11) NOT NULL,
  `Source` int(11) DEFAULT '1',
  `UserId` int(11) NOT NULL,
  `FileKey` varchar(500) DEFAULT NULL,
  `DisplayName` varchar(500) NOT NULL DEFAULT '0',
  `UploadType` int(11) NOT NULL DEFAULT '0',
  `FileName` varchar(500) NOT NULL DEFAULT '0',
  `QuestionnaireId` int(11) DEFAULT NULL,
  `IsDraft` tinyint(3) NOT NULL DEFAULT '0',
  `CreatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` tinyint(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Attachment_Source_Archived` (`Source`,`Archived`),
  KEY `Attachment_Source_Source_Id` (`Source`,`SourceId`),
  KEY `Attachment_UserId_idx` (`UserId`),
  KEY `AttachmentId_QuestionnaireId_idx` (`QuestionnaireId`),
  CONSTRAINT `AttachmentId_QuestionnaireId` FOREIGN KEY (`QuestionnaireId`) REFERENCES tazeez.`questionnaire` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Attachment_UserId` FOREIGN KEY (`UserId`) REFERENCES tazeez.`user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
---------------------

ALTER TABLE `tazeez`.`questionnaireanswertext` 
ADD COLUMN `IsDraft` TINYINT(3) NOT NULL DEFAULT 0 AFTER `UserId`;
---------------------

ALTER TABLE `tazeez`.`questionnaireanswerchoice` 
ADD COLUMN `IsDraft` TINYINT(3) NOT NULL DEFAULT 0 AFTER `UserId`;

-------------------------------

ALTER TABLE `tazeez`.`questionnairequestion` 
ADD COLUMN `IsDraft` TINYINT(3) NOT NULL DEFAULT 0 AFTER `Status`;
