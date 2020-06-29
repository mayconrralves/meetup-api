import { Router } from 'express';

const routes = new Router();

const mid = (req, res, next ) =>{
    console.log('Ola mundo', next);
    next();
};
routes.use(mid);
routes.get('/', (req, res) =>{
    return res.send('Ola mundo1');
});
routes.get('/ola', (req, res) =>{
    return res.send('Ola mundo2');
});



export default routes;