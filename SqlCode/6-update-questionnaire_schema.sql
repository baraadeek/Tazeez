ALTER TABLE `tazeez`.`questionnaire` 
ADD COLUMN `UserId` INT(11) not NULL AFTER `QuestionnaireTemplateId`,
ADD INDEX `UserId_QuestionnaireUserId_idx` (`UserId` ASC);
;
ALTER TABLE `tazeez`.`questionnaire` 
ADD CONSTRAINT `UserId_QuestionnaireUserId`
  FOREIGN KEY (`UserId`)
  REFERENCES `tazeez`.`user` (`Id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


----------------------------------------------------------------

ALTER TABLE `tazeez`.`questionnaire` 
ADD COLUMN `CompletedUtc` TIMESTAMP NULL AFTER `DueDateUTC`;
