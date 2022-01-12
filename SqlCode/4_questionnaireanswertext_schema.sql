CREATE TABLE `tazeez`.`questionnaireanswertext` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionnaireQuestionId` int(11) NOT NULL,
  `Text` text CHARACTER SET utf8,
  `UserId` int(11) DEFAULT NULL,
  `CreatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` tinyint(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `QuestionAnswerText_QuestionnaireQuestionId_idx` (`QuestionnaireQuestionId`),
  KEY `QuestionAnswerText_UserId_idx` (`UserId`),
  CONSTRAINT `QuestionAnswerText_QuestionnaireQuestionId` FOREIGN KEY (`QuestionnaireQuestionId`)
	REFERENCES tazeez.`questionnairequestion` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `QuestionAnswerText_UserId` FOREIGN KEY (`UserId`) REFERENCES tazeez.`user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

------------------------------------------------------------------------

CREATE TABLE `tazeez`.`questionnaireanswerchoice` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionnaireQuestionId` int(11) NOT NULL,
  `QuestionChoiceId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `CreatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` tinyint(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `QuestionnaireQuestionId_QuestionId_idx` (`QuestionnaireQuestionId`),
  KEY `QuestionChoiceId_QuestionChoiceId_idx` (`QuestionChoiceId`),
  KEY `QuestionAnswer_UserId_idx` (`UserId`),
  CONSTRAINT `QuestionAnswer_AssessmentQuestionAnswerChoiceId` FOREIGN KEY (`QuestionChoiceId`) REFERENCES `tazeez`.`questionchoice` (`Id`),
  CONSTRAINT `QuestionAnswer_QuestionnaireQuestionId` FOREIGN KEY (`QuestionnaireQuestionId`) REFERENCES `tazeez`.`questionnairequestion` (`Id`),
  CONSTRAINT `QuestionAnswer_UserId` FOREIGN KEY (`UserId`) REFERENCES `tazeez`.`user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
