import * as Yup from 'yup';
import {parseISO, isBefore,isAfter, subHours} from 'date-fns';
import Meetups from '../models/Meetups';
import File from '../models/File';


class MeetController {
    
    async store(req, res) {
        if(isBefore(parseISO(req.body.date), new Date())) {
            return res.status(400).json({error: 'This date has passed'});
        }
        const { localization, description, date, banner_id } = req.body;
    
        const meet = await Meetups.findOne({
            where: { date: parseISO(date) }
        });

        if(meet){
            return res.status(400).json({
                error: " Date is not available",
            });
        }
     

        const user_id = req.userId;

        const file = await File.findByPk(banner_id);
        
        if(!file){
            return res.status(400).json({
                error: "Banner don't exist in database",
            });
        }
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
        

        if(isBefore(parseISO(req.body.date), new Date())){
            return res.status(400).json({
                error: 'This date has passed'
            });
        }

        const { id } = req.query;
        
        const meet = await Meetups.findByPk(id);

        if(!meet){
            return res.status(400).json({
                error: "Meetup no exists",
            });
        }

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