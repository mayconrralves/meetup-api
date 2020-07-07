import * as Yup from 'yup';
import {parseISO, isDate, isBefore} from 'date-fns';
import Meet from '../models/Meet';
import File from '../models/File';


class MeetController {
    
    async store(req, res) {
        const schema = Yup.object().shape({
            localization: Yup.string().required(),
            description: Yup.string().required(),
            date: Yup.string().matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-\d{2}:\d{2}$/).required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Validations Errors'});
        }
        if(isBefore(parseISO(req.body.date), new Date())) {
            return res.status(400).json({error: 'This date has passed'});
        }

        return res.json(req.body);
    }

    async update(req, res) {
        return res.json({});
    }

    async delete(req, res) {
        return res.json({});
    }

    async index(req, res) {
        return res.json({});
    }
}


export default new MeetController();