import mongoose from 'mongoose';
import Notification from '../schemas/Notification';

class NotificationController{
	async index(req, res) {
		const notifications = await Notification.find({
			user: req.userId,
		});
		return res.json(notifications);
	}
	async update(req, res) {
		const result = await Notification.update({
			_id: req.query.id,
		},
		{
			read: true,
		});
		return res.json(result);
	}

}

export default new NotificationController();