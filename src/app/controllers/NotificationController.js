import mongoose from 'mongoose';
import Notification from '../schemas/Notification';

class NotificationController{
	async index(req, res) {
		const notifications = await Notification.find({
			user: req.userId,
		});
		return res.json(notifications);
	}

}

export default new NotificationController();