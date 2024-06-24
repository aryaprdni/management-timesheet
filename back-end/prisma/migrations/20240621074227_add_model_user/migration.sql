-- CreateTable
CREATE TABLE `User` (
    `nama_karyawan` VARCHAR(100) NOT NULL,
    `rate` INTEGER NOT NULL,
    `token` VARCHAR(191) NULL,

    PRIMARY KEY (`nama_karyawan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timesheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_mulai` DATETIME(3) NOT NULL,
    `tanggal_berakhir` DATETIME(3) NOT NULL,
    `jam_mulai` VARCHAR(10) NOT NULL,
    `jam_berakhir` VARCHAR(10) NOT NULL,
    `judul_kegiatan` VARCHAR(255) NOT NULL,
    `nama_proyek` VARCHAR(255) NOT NULL,
    `nama_karyawan` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `timesheet` ADD CONSTRAINT `timesheet_nama_karyawan_fkey` FOREIGN KEY (`nama_karyawan`) REFERENCES `User`(`nama_karyawan`) ON DELETE RESTRICT ON UPDATE CASCADE;
