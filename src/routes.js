import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
const routes = new Router();

routes.post('/signup', UserController.store);
routes.post('/signin', SessionController.store);
routes.post('/user/update', UserController.update);


export default routes;