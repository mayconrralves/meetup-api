import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import multer from 'multer';
import multerConfig from './config/multer';
import authAuthorization from './app/middlewares/auth';
import MeetController from './app/controllers/MeetController';
import NotificationController from './app/controllers/NotificationController';
import UserEnrollmentController from './app/controllers/UserEnrollmentController';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/signup', UserController.store);
routes.post('/signin', SessionController.store);

routes.use(authAuthorization);
routes.post('/user/update', UserController.update);
routes.post('/user/avatar', upload.single('file'), FileController.store);
routes.post('/meet/banner', upload.single('file'), FileController.store);
routes.post('/meet/store', MeetController.store);
routes.get('/meet/index', MeetController.index);
routes.put('/meet/update', MeetController.update);
routes.delete('/meet/delete', MeetController.delete);
routes.get('/meetups', UserEnrollmentController.index);
routes.post('/meet/enrollment', UserEnrollmentController.store);
routes.put('/meet/notifications/update', NotificationController.update);
routes.get('/meet/notifications/', NotificationController.index);

export default routes; 