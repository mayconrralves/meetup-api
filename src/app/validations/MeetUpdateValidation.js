import * as Yup from 'yup';

import regexDate from '../../config/regexDate';
import 'dotenv/config';

export default async (req, res, next) => {
	const schema = Yup.object().shape({
        title: Yup.string(),
        localization: Yup.string(),
        description: Yup.string(),
        date: Yup.string().matches(regexDate),
        banner_id: Yup.string(),
    });
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();

	}catch(err) {
        if(process.env.NODE_ENV === 'developement'){
            console.log(err);
        }
		return res.status(400).json({
                error: 'Validation fails',
           });
	}
	

       
            
       
}