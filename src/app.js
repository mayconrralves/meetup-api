import 'dotenv/config';
import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import cookieParser from 'cookie-parser';


import './database';


class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
        this.server.use('/user/avatar', express.static(path.resolve(__dirname, '..', 'storage', 'uploads')));
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(cors(
            // {
            //     origin: [process.env.ORIGIN], 
            //     optionsSuccessStatus: 200,
            //     credentials: true
            // }
        ));
        this.server.use(cookieParser());
        this.server.use(express.json());
        

    }

    routes() {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async(err, req, res, next)=>{
            if(process.env.NODE_ENV === 'developement'){
                const errors = await new Youch(err, req).toJSON();
                return res.status(500).json(errors);
            }
            return res.status(500).json({error: "Internal server error"});
        });
    }
}

export default new App().server;