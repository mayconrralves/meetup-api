import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';
class SessionController {

    async index(req, res) {
        const id = req.userId;

        const { name, email } = await User.findByPk(id);
        return res.json({
            name,
            email
        });
    }

    async store(req, res) {
        const { email, password} = req.body;

        const user = await User.findOne({
           where: {
               email,
           },
           include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id','name','path', 'url'],
                }
           ],
        });

        if(!user){
            return res.status(401).json({
                error: "User not found",
            });
        }
        if(!(await user.checkPassword(password))){
            return res.status(401).json({
                error: 'Password does not match',
            });
        }

        const { id, name, avatar } = user;

        const token = jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn + 'd',
            });
        const expires = new Date();
        expires.setDate(expires.getDate()+parseInt(authConfig.expiresIn));
        res.cookie('token', token, {
            httpOnly: true,
            expires,
            //sameSite: 'none',
            //secure: true,

        });
        return res.json({ 
           user: {
                    id,
                    email,
                    name,
                    avatar,
            },
            token,
        });
    }

    async delete(req, res) {
        const expires = new Date();
        expires.setDate(expires.getDate()-1);
        res.cookie('token', null, {
             expires,
        });
        res.cookie('_csrf', null, {
            expires,
        })
        return res.status(200).json({
            msg: 'Session deleted',
        });
    }
}

export default new SessionController();