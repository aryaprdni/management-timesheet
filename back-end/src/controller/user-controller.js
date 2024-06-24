import userService from '../service/user-service.js';

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const check = async (req, res, next) => {
    try {
        const nama_karyawan = req.user.nama_karyawan;
        const result = await userService.check(nama_karyawan);
        res.status(200).json({
            data : result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    login,
    check
}