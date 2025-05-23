-- CreateTable
CREATE TABLE `trip_ticket` (
    `ticket_id` VARCHAR(50) NOT NULL,
    `date_from` DATE NULL,
    `date_to` DATE NULL,
    `vehicle_id` INTEGER NOT NULL,
    `destination` TEXT NOT NULL,
    `purpose` TEXT NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `alternatedriver_id` INTEGER NOT NULL,
    `approving_officer` VARCHAR(30) NOT NULL,
    `pos1` VARCHAR(100) NOT NULL,
    `pass1` VARCHAR(30) NOT NULL,
    `pass2` VARCHAR(30) NOT NULL,
    `pass3` VARCHAR(30) NOT NULL,
    `date_time_created` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `pass4` VARCHAR(255) NULL,
    `pass5` VARCHAR(255) NULL,
    `pass6` VARCHAR(255) NULL,
    `pass7` VARCHAR(255) NULL,

    INDEX `driver_id`(`driver_id`),
    INDEX `vehicle_id`(`vehicle_id`),
    INDEX `alternatedriver_id`(`alternatedriver_id`),
    PRIMARY KEY (`ticket_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chief` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `pos` VARCHAR(100) NOT NULL,
    `ao` TINYINT NOT NULL,
    `ro` TINYINT NOT NULL,
    `ta` TINYINT NOT NULL,
    `fp` TINYINT NOT NULL,
    `fa` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `driver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `position` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate_number` VARCHAR(20) NOT NULL,
    `make` VARCHAR(20) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `division_ass` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fund_source` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issuance_slip` (
    `id` VARCHAR(30) NOT NULL,
    `ticket_id` VARCHAR(50) NOT NULL,
    `date_req` DATE NOT NULL,
    `charging` VARCHAR(30) NOT NULL,
    `charge_to` VARCHAR(30) NOT NULL,
    `req_officer` VARCHAR(30) NOT NULL,
    `vehicle` VARCHAR(30) NOT NULL,
    `driver` VARCHAR(30) NOT NULL,
    `prepared` VARCHAR(30) NOT NULL,
    `approved` VARCHAR(30) NOT NULL,
    `consumableproduct` VARCHAR(50) NOT NULL,
    `liters` INTEGER NOT NULL,
    `pos1` VARCHAR(100) NOT NULL,
    `pos2` VARCHAR(100) NOT NULL,
    `date_time_created` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ticket_id`(`ticket_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `travel_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tt_id` VARCHAR(50) NOT NULL,
    `date_from` DATE NOT NULL,
    `date_to` DATE NOT NULL,
    `recommending` VARCHAR(200) NOT NULL,
    `approval` VARCHAR(200) NOT NULL,
    `pos_recommending` VARCHAR(200) NOT NULL,
    `pos_approval` VARCHAR(200) NOT NULL,
    `date_time_created` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `tt_id`(`tt_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trip_ticket` ADD CONSTRAINT `trip_ticket_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `trip_ticket` ADD CONSTRAINT `trip_ticket_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `driver`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `trip_ticket` ADD CONSTRAINT `trip_ticket_ibfk_3` FOREIGN KEY (`alternatedriver_id`) REFERENCES `driver`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `issuance_slip` ADD CONSTRAINT `issuance_slip_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `trip_ticket`(`ticket_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `travel_order` ADD CONSTRAINT `travel_order_ibfk_1` FOREIGN KEY (`tt_id`) REFERENCES `trip_ticket`(`ticket_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
