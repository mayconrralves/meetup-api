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


const routes = new Router();
const upload = multer(multerConfig);
routes.post('/signup', UserController.store);
routes.post('/signin', SessionController.store);

routes.use(authAuthorization);
routes.use(csrfProtection);
routes.get('/getcsrf', CSRFController.index);
routes.post('/user/update', UserController.update);
routes.post('/user/avatar', upload.single('file'), FileController.store);
routes.post('/meet/banner', upload.single('file'), FileController.store);
routes.post('/meet/store', MeetController.store);
routes.get('/meet/index', MeetController.index);
routes.put('/meet/update', MeetController.update);
routes.delete('/meet/delete', MeetController.delete);
routes.get('/meet/enrollment/index', MeetEnrollmentController.index);
routes.post('/meet/enrollment', MeetEnrollmentController.store);
routes.get('/meet/notifications', NotificationController.index);
routes.get('/user/meets', ScheduleController.index);

export default routes; 