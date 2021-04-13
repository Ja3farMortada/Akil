CREATE TABLE `temporary-akil`.`driver_orders` ( `operation_ID` INT NOT NULL AUTO_INCREMENT , `order_ID_FK` INT NOT NULL , `driver_ID_FK` INT NOT NULL , `op_date` DATE NOT NULL , `op_time` TIME NOT NULL , `op_status` BOOLEAN NOT NULL DEFAULT TRUE , PRIMARY KEY (`operation_ID`)) ENGINE = InnoDB;

ALTER TABLE `driver_orders` ADD FOREIGN KEY (`driver_ID_FK`) REFERENCES `drivers`(`driver_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `driver_orders` ADD FOREIGN KEY (`order_ID_FK`) REFERENCES `orders`(`order_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE temporary-akil.orders DROP FOREIGN KEY orders_ibfk_2`;`
ALTER TABLE `orders` DROP `driver_ID_FK`;