ALTER TABLE `orders` ADD `order_currency` VARCHAR(10) NOT NULL DEFAULT 'lira' AFTER `recipient_phone`;

ALTER TABLE `drivers_invoice` ADD `total_dollar` DOUBLE NOT NULL DEFAULT '0' AFTER `total_value`;

ALTER TABLE `customers` ADD `customer_due_dollar` DOUBLE NOT NULL DEFAULT '0' AFTER `customer_due`;

ALTER TABLE `customer_payments` ADD `payment_currency` VARCHAR(10) NOT NULL DEFAULT 'lira' AFTER `customer_ID_FK`;
