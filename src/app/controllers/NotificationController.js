import mongoose from 'mongoose';
import Notification from '../schemas/Notification';

class NotificationController{
	async index(req, res) {
		console.log(req.userId);
		const notifications = await Notification.find({
			user: req.userId,
		});
		return res.json(notifications);
	}

	async update(req, res) {
		return res.json({

		})
	}
}

export default new NotificationController();