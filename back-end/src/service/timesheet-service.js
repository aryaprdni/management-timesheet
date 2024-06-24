import { PrismaClient } from "@prisma/client";
import { validate } from "../validation/validation.js";
import { createTimesheetValidation, deleteByIdValidation, updateTimesheetValidation } from "../validation/timesheet-validation.js";
import { ResponseError } from "../error/response-error.js";

const prismaClient = new PrismaClient();

const create = async (request, user) => {
    const createTimesheetRequest = validate(createTimesheetValidation, request);

    try {
        const createdTimesheet = await prismaClient.timesheet.create({
            data: {
                judul_kegiatan: createTimesheetRequest.judul_kegiatan,
                nama_proyek: createTimesheetRequest.nama_proyek,
                tanggal_mulai: new Date(createTimesheetRequest.tanggal_mulai),
                tanggal_berakhir: new Date(createTimesheetRequest.tanggal_berakhir),
                jam_mulai: createTimesheetRequest.jam_mulai, 
                jam_berakhir: createTimesheetRequest.jam_berakhir, 
                use: {
                    connect: {
                        nama_karyawan: user.nama_karyawan 
                    }
                }
            },
            select: {
                id: true,
                nama_karyawan: true,
                judul_kegiatan: true,
                nama_proyek: true,
                tanggal_mulai: true,
                tanggal_berakhir: true,
                jam_mulai: true,
                jam_berakhir: true,
            }
        });

        return createdTimesheet;
    } catch (error) {
        console.error("Error creating timesheet:", error);
        throw error; 
    }
}

const update = async (request, user) => {
    const updateTimesheetRequest = validate(updateTimesheetValidation, request);

    try {
        const updatedTimesheet = await prismaClient.timesheet.update({
            where: {
                id: updateTimesheetRequest.id
            },
            data: {
                judul_kegiatan: updateTimesheetRequest.judul_kegiatan,
                nama_proyek: updateTimesheetRequest.nama_proyek,
                tanggal_mulai: new Date(updateTimesheetRequest.tanggal_mulai),
                tanggal_berakhir: new Date(updateTimesheetRequest.tanggal_berakhir),
                jam_mulai: updateTimesheetRequest.jam_mulai, 
                jam_berakhir: updateTimesheetRequest.jam_berakhir, 
                use: {
                    connect: {
                        nama_karyawan: user.nama_karyawan 
                    }
                }
            },
            select: {
                id: true,
                nama_karyawan: true,
                judul_kegiatan: true,
                nama_proyek: true,
                tanggal_mulai: true,
                tanggal_berakhir: true,
                jam_mulai: true,
                jam_berakhir: true,
            }
        });

        return updatedTimesheet;
    } catch (error) {
        console.error("Error updating timesheet:", error);
        throw error; 
    }
}

const getAll = async (user) => {
    try {
        const timesheets = await prismaClient.timesheet.findMany({
            where: {
                use: {
                    nama_karyawan: user.nama_karyawan
                }
            },
            select: {
                id: true,
                judul_kegiatan: true,
                nama_proyek: true,
                tanggal_mulai: true,
                tanggal_berakhir: true,
                jam_mulai: true,
                jam_berakhir: true,
            }
        });
        return timesheets;
    } catch (error) {
        console.error("Error getting timesheets:", error);
        throw error; 
    }
}

const remove = async (user, id) => {
    try {
        const validatedId = validate(deleteByIdValidation, { id });

        const totalInDatabase = await prismaClient.timesheet.count({
            where: {
                nama_karyawan: user.nama_karyawan,
                id: validatedId.id
            }
        });

        if (totalInDatabase !== 1) {
            throw new ResponseError(404, "Timesheet not found");
        }

        return prismaClient.timesheet.delete({
            where: {
                id: validatedId.id
            }
        });
    } catch (error) {
        console.error("Error deleting timesheet:", error);
        throw error;
    }
}

const getAllFilteredByProject = async (user, nama_proyek) => {
    try {
        let whereClause = {
            use: {
                nama_karyawan: user.nama_karyawan
            }
        };

        if (nama_proyek) {
            whereClause.nama_proyek = nama_proyek;
        }

        const timesheets = await prismaClient.timesheet.findMany({
            where: whereClause,
            select: {
                id: true,
                judul_kegiatan: true,
                nama_proyek: true,
                tanggal_mulai: true,
                tanggal_berakhir: true,
                jam_mulai: true,
                jam_berakhir: true,
            }
        });

        return timesheets;
    } catch (error) {
        console.error("Error getting filtered timesheets:", error);
        throw error; 
    }
}


export default {
    create,
    update,
    getAll,
    remove,
    getAllFilteredByProject
}
