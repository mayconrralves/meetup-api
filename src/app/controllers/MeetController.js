import * as Yup from 'yup';
import {parseISO, isBefore} from 'date-fns';
import Meetups from '../models/Meetups';
import File from '../models/File';


class MeetController {
    
    async store(req, res) {
        const schema = Yup.object().shape({
            localization: Yup.string().required(),
            description: Yup.string().required(),
            date: Yup.string().matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-\d{2}:\d{2}$/).required(),
            banner_id: Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Validations Errors'});
        }
        if(isBefore(parseISO(req.body.date), new Date())) {
            return res.status(400).json({error: 'This date has passed'});
        }
        const { localization, description, date, banner_id } = req.body;

        const user_id = req.userId;
        const result = await Meetups.create({
            user_id,
            localization,
            description,
            date,
            banner_id
        });

        return res.json(result);
    }

    async update(req, res) {
        
        return res.json({});
    }

    async delete(req, res) {
        return res.json({});
    }

    async index(req, res) {
        const result = await Meetups.findAll({
            where: { user_id: req.userId },
            include: [
                {
                    model: File,
                    as: 'banner',
                    attributes: ['id', 'name', 'path', 'url'],
                }
            ]
        });
        return res.json(result);
    }
}


export default new MeetController();