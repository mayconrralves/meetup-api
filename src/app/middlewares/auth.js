import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { promisify } from 'util';


export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({error: 'Token not Provided'});
    }

    const token = req.cookies.token;

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        //User id is global now
        req.userId = decoded.id;
        next();
    }catch(error) {
        return res.status(401).json({error: 'Token Invalid'});
    }

}