import Joi from 'joi';

const createTimesheetValidation = Joi.object({
    judul_kegiatan: Joi.string().max(255).required(),
    nama_proyek: Joi.string().max(255).required(),
    tanggal_mulai: Joi.date().required(),
    tanggal_berakhir: Joi.date().required(),
    jam_mulai: Joi.string().required(),
    jam_berakhir: Joi.string().required()
})

const updateTimesheetValidation = Joi.object({
    id: Joi.number().positive().required(),
    judul_kegiatan: Joi.string().max(255).required(),
    nama_proyek: Joi.string().max(255).required(),
    tanggal_mulai: Joi.date().required(),
    tanggal_berakhir: Joi.date().required(),
    jam_mulai: Joi.string().required(),
    jam_berakhir: Joi.string().required()
})

const getAllTimesheetValidation = Joi.object({
    id: Joi.number().positive().required(),
})

const deleteByIdValidation = Joi.object({
    id: Joi.number().positive().required(),
})

export {
    createTimesheetValidation,
    updateTimesheetValidation,
    getAllTimesheetValidation,
    deleteByIdValidation
}