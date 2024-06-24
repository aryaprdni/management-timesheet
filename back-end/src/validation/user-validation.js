import Joi from 'joi';

const loginUserValidation = Joi.object({
    nama_karyawan: Joi.string().max(100).required(),
    rate: Joi.number().required()
})

export {
    loginUserValidation
}