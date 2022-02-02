ALTER TABLE `tazeez`.`user` 
ADD COLUMN `ParentId` INT(11) NULL AFTER `Image`,
ADD COLUMN `BirthDay` TIMESTAMP NULL AFTER `ParentId`,
ADD INDEX `UserId_ParentId_idx` (`ParentId` ASC);
;

ALTER TABLE `tazeez`.`user` 
ADD CONSTRAINT `UserId_ParentId`
  FOREIGN KEY (`ParentId`)
  REFERENCES `tazeez`.`user` (`Id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


-----------------------------------

ALTER TABLE `tazeez`.`contactrequest` 
CHANGE COLUMN `CreatedDate` `CreatedDateUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `UpdateDate` `LastUpdatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ;

--------------------------------------------------

ALTER TABLE `tazeez`.`user` 
CHANGE COLUMN `CreatedDate` `CreatedDateUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `UpdateDate` `LastUpdatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ;

-------------------------------

CREATE TABLE `tazeez`.`questionnairegrouptemplatequestion` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `QuestionnaireTemplateId` INT(11) NOT NULL,
  `CreatedDateUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdatedUTC` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Archived` TINYINT(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  INDEX `GroupTemplateQuestion_TemplateQuestionId_idx` (`QuestionnaireTemplateId` ASC),
  CONSTRAINT `GroupTemplateQuestion_TemplateQuestionId`
    FOREIGN KEY (`QuestionnaireTemplateId`)
    REFERENCES `tazeez`.`questionnairetemplate` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


--------------------------------
ALTER TABLE `tazeez`.`user` 
ADD COLUMN `Gender` TINYINT(3) NULL AFTER `BirthDay`;
