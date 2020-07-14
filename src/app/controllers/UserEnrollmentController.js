import UserMeet from '../models/UserMeet';
import User from '../models/User';
import Meetups from '../models/Meetups'

class UserEnrollmentController{
	async store(req, res) {
		const fk_users_id = req.userId;
		const fk_meets_id = req.query.id;
		const userMeet = await UserMeet.create({
			fk_meets_id,
			fk_users_id,
		});
		return res.json(userMeet);
	}
}

export default new UserEnrollmentController();

