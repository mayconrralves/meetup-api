import { parseISO, isPast } from 'date-fns';
import UserMeet from '../models/UserMeet';
import User from '../models/User';
import Meetups from '../models/Meetups'

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
			},
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
			include: {
				model: Meetups,
				as: 'fk_meets',
				attributes: ['id', 'date'],
				where: { date: meet.date}

			}
		});
		if(userMeetSameDate){
			return res.status(400).json({error: 'You signed up for another meetup on the same day and hour'});
		}
		const result = await UserMeet.create({
			fk_meets_id,
			fk_users_id,
		});
		return res.json(userMeet);
	}
}

export default new UserEnrollmentController();

