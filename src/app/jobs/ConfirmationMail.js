import Mail from '../../lib/Mail';

class ConfirmationMail {
	get key() {
		return 'ConfirmationMail';
	}
	async handle({ data }){
		const { subject, text,userOriginMeet } = data;
		
		await Mail.sendMail({
			to: `${userOriginMeet.name}<${userOriginMeet.email}>`,
			subject,
			text
		});
	}
}


export default new ConfirmationMail();