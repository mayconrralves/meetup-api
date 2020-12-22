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
import sessionStoreValidation from './app/validations/SessionStoreValidation';
import userUpdateValidation from './app/validations/UserUpdateValidation';
import idQueryValidation from './app/validations/IdQueryValidation';
import fileValidation from './app/validations/FileValidation';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/signup',userStoreValidation, UserController.store);
routes.post('/signin', sessionStoreValidation, SessionController.store);

routes.use(authAuthorization);
routes.use(csrfProtection);
routes.get('/getcsrf', CSRFController.index);
routes.get('/logout', SessionController.delete);
routes.get('/user', SessionController.index);
routes.put('/user/update', userUpdateValidation, UserController.update);
routes.post('/user/avatar', [ upload.single('file'), fileValidation], FileController.store);
routes.get('/meets/all', ScheduleController.index);
routes.post('/meet/banner', [upload.single('file'), fileValidation], FileController.store);
routes.post('/meet/store',meetStoreValidation, MeetController.store);
routes.get('/meet/index', MeetController.index);
routes.put('/meet/update',[idQueryValidation, meetUpdateValidation], MeetController.update);
routes.delete('/meet/delete',idQueryValidation, MeetController.delete);
routes.get('/meet/enrollment/index', MeetEnrollmentController.index);
routes.put('/meet/enrollment/update', idQueryValidation, MeetEnrollmentController.update);
routes.post('/meet/enrollment', MeetEnrollmentController.store);
routes.get('/meet/notifications', NotificationController.index);
routes.put('/meet/notifications/update',idQueryValidation, NotificationController.update);


export default routes; 