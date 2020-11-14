import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import multer from 'multer';
import multerConfig from './config/multer';
import  csrfProtection from './config/csrfProtection';
import authAuthorization from './app/middlewares/auth';
import MeetController from './app/controllers/MeetController';
import NotificationController from './app/controllers/NotificationController';
import MeetEnrollmentController from './app/controllers/MeetEnrollmentController';
import ScheduleController from './app/controllers/ScheduleController';
import CSRFController from './app/controllers/CSRFController';
import meetStoreValidation from './app/validations/MeetStoreValidation';
import meetUpdateValidation from './app/validations/MeetUpdateValidation';
import userStoreValidation from './app/validations/UserStoreValidation';
import userUpdateValidation from './app/validations/UserUpdateValidation';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/signup',userStoreValidation, UserController.store);
routes.post('/signin', SessionController.store);

routes.use(authAuthorization);
routes.use(csrfProtection);
routes.get('/getcsrf', CSRFController.index);
routes.get('/logout', SessionController.delete);
routes.put('/user/update', userUpdateValidation, UserController.update);
routes.post('/user/avatar', upload.single('file'), FileController.store);
routes.get('/meets/all', ScheduleController.index);
routes.post('/meet/banner', upload.single('file'), FileController.store);
routes.post('/meet/store',meetStoreValidation, MeetController.store);
routes.get('/meet/index', MeetController.index);
routes.put('/meet/update', meetUpdateValidation, MeetController.update);
routes.delete('/meet/delete', MeetController.delete);
routes.get('/meet/enrollment/index', MeetEnrollmentController.index);
routes.put('/meet/enrollment/update', MeetEnrollmentController.update);
routes.post('/meet/enrollment', MeetEnrollmentController.store);
routes.get('/meet/notifications', NotificationController.index);
routes.put('/meet/notifications/update', NotificationController.update);


export default routes; 