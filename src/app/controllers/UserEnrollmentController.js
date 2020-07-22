import { parseISO, isPast} from 'date-fns';
import { Op, fn, col, where } from 'sequelize';
import UserMeet from '../models/UserMeet';
import User from '../models/User';
import Meetups from '../models/Meetups';
import File from '../models/File';
import Mail from '../../lib/Mail';
import NotificationSchema from '../schemas/Notification';

class UserEnrollmentController{
	async store(req, res) {
		const fk_users_id = req.userId;
		const fk_meets_id = req.query.id;
		
		const meet = await Meetups.findByPk(fk_meets_id);
		//if exists a meet in database
		if(!meet) {
			return res.status(400).json({error: 'Meetups does not exist'});
		}
		//if same user and own of meet
		if(meet.user_id === fk_users_id){
			return res.status(400).json({error: ' You created this meet'})
		}

		//if already has aenrollment in meet 
		const userMeet = await UserMeet.findOne({
			where: {
				fk_meets_id,
			}
		});
		if(userMeet) {
			return res.status(400).json({error: 'You are already enrollment'})
		}
		
		if(isPast(meet.date)){
			return res.status(400).json({error: 'meetup has pasted'});
		}

		const userMeetSameDate = await UserMeet.findAll({
			where: {
				fk_users_id,
			},
			include:
				{
					model: Meetups,
					as: 'fk_meets',
					attributes: ['id', 'date'],
					where: { date: meet.date}
				}
		});
		//if user has a meetup in same date 
		if(userMeetSameDate.length){
			return res.status(400).json({error: 'You signed up for another meetup on the same day and hour'});
		}
		const userOriginMeet = await User.findByPk(meet.user_id);

		const user = await User.findByPk(fk_users_id, {
			attributes: ['id', 'name', 'email']
		});
		const result = await UserMeet.create({
			fk_meets_id,
			fk_users_id,
		});
		//Send email
		const text = `Você tem uma nova inscrição do usuário ${user.name} com email ${user.email}`;
		await Mail.sendMail({
			to: `${userOriginMeet.name}<${userOriginMeet.email}>`,
			subject: 'Inscrição de Usuário',
			text,
		});

		await NotificationSchema.create({
			content: text,
			user: meet.user_id,
		});

		return res.json(result);
	}

	async index(req, res) {
		if(!req.query.page){
			return res.status(400).json({error: 'Must to have a page number'});
		}
		const {date, page} = req.query;
		const limitByPage = 20;

		const meet = await Meetups.findAll({
			attributes: ['id', 'localization','description', 'date'],
			where: where(fn('date', col('date')),'=', date),
			include: [
				{
					model: User,
					as: 'user_meet',
					attributes: ['id', 'name','email'],
					include: [
						{
							model: File,
							as: 'avatar',
							attributes: ['id','name','path','url']
						}
					]
				}
			],
			limit: limitByPage,
			offset: (page-1)*limitByPage,
		});
		return res.json(meet);
	}
}

export default new UserEnrollmentController();

