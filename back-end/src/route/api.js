import express from 'express';
import timesheetController from '../controller/timesheet-controller.js';
import { authMiddleware } from '../error/auth-middleware.js';
import userController from '../controller/user-controller.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);

userRouter.post('/api/timesheet', timesheetController.create);
userRouter.patch('/api/timesheet/:id', timesheetController.update);
userRouter.get('/api/timesheet', timesheetController.getAll);
userRouter.delete('/api/timesheet/:id', timesheetController.remove);
userRouter.get('/api/user', userController.check);
userRouter.get('/api/timesheet/filter', timesheetController.filterByProject);

export default userRouter