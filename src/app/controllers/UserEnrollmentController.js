import { parseISO, isPast } from 'date-fns';
import UserMeet from '../models/UserMeet';
import User from '../models/User';
import Meetups from '../models/Meetups';
import Mail from '../../lib/Mail';

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
		if(meet.user_id === req.userId){
			return res.status(400).json({error: ' You created this meet'})
		}

		//if already has a meet 
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
		const userOriginMeet = await User.findByPk(fk_users_id);
		const user = await Meetups.findByPk(fk_meets_id, {
			include: [
				{
					model: User,
					as: 'user_meet',
					attributes: ['id', 'name', 'email']
				}
			]
		});
		const result = await UserMeet.create({
			fk_meets_id,
			fk_users_id,
		});
		//Send email
		await Mail.sendMail({
			to: `${userOriginMeet.name}<${userOriginMeet.email}>`,
			subject: 'Inscrição de Usuário',
			text: `Você tem uma nova inscrição do usuário ${user['user_meet'].name} com email ${user['user_meet'].email}`,
		});

		return res.json(result);
	}
}

export default new UserEnrollmentController();

