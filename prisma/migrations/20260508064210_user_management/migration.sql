-- AlterTable
ALTER TABLE `User` ADD COLUMN `suspended` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `InviteToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'MARKETING') NOT NULL DEFAULT 'USER',
    `expiresAt` DATETIME(3) NOT NULL,
    `usedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `InviteToken_token_key`(`token`),
    INDEX `InviteToken_token_idx`(`token`),
    INDEX `InviteToken_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InviteToken` ADD CONSTRAINT `InviteToken_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
