import { where,fn, col } from 'sequelize';
import File from '../models/File';
import Meetups from '../models/Meetups';
import User from '../models/User';


class ScheduleController{
	async index(req, res){
		const meets = await Meetups.findAll({
			where: { date: where(fn('date', col('date')), '>=', new Date()) },
			order: ['date'],
			include: [
				{
					model: File,
                    as: 'banner',
                    attributes: ['id', 'name', 'path', 'url'],
				},
				{
					model: User,
					as: 'user_meet',
					attributes: ['id','name','email'],
					include: [
					{
						model: File,
						as: 'avatar',
						attributes: ['id','name', 'path','url'],
					}
				]
			}
			]
		});
			return res.json(meets);
	}
}


export default new ScheduleController();