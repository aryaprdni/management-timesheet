import timesheetService from '../service/timesheet-service.js';

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await timesheetService.create(req.body, user);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const request = req.body;
        request.id = id;

        const result = await timesheetService.update(request, user);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        const user = req.user
        const result = await timesheetService.getAll(user);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user
        const { id } = req.params;
        const result = await timesheetService.remove(user, id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const filterByProject = async (req, res, next) => {
    try {
        const user = req.user;
        const { nama_proyek } = req.query;
        const result = await timesheetService.getAllFilteredByProject(user, nama_proyek);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    update,
    getAll,
    remove,
    filterByProject
}