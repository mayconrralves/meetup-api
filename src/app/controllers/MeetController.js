import * as Yup from 'yup';
import {parseISO, isBefore} from 'date-fns';
import Meetups from '../models/Meetups';
import File from '../models/File';

const regex_date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-\d{2}:\d{2}$/;

class MeetController {
    
    async store(req, res) {
        const schema = Yup.object().shape({
            localization: Yup.string().required(),
            description: Yup.string().required(),
            date: Yup.string().matches(regex_date).required(),
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
        const schema = Yup.object().shape({
            localization: Yup.string(),
            description: Yup.string(),
            date: Yup.string().matches(regex_date),
            banner_id: Yup.string(),
        });

        if(! (await schema.isValid(req.body))){
            return res.status(400).json({
                error: 'Validation fails'
            });
        }

        if(isBefore(parseISO(req.body.date), new Date())){
            return res.status(400).json({
                error: 'This date has passed'
            });
        }
        const { id } = req.query;
        
        const meet = await Meetups.findByPk(id);

        await meet.update(req.body);

        return res.json(meet);
    }

    async delete(req, res) {
        const { id } = req.query;

        const meet = await Meetups.findByPk(id);

        if(!meet){
            return res.status(400).json({
                error: 'Meetup no exists'
            });
        }
        await meet.destroy();

        return res.json(meet);
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