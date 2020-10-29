import * as Yup from 'yup';

import regexDate from '../../config/regexDate';

export default async (req, res, next) => {
	try {
		const schema = Yup.object().shape({
            localization: Yup.string(),
            description: Yup.string(),
            date: Yup.string().matches(regexDate),
            banner_id: Yup.string(),
        });

        await schema.validate(req.body, { abortEarly: false });
        next();

	}catch(err) {
		return res.status(400).json({
                error: 'Validation fails', 
                messages: err.inner
           });
	}
	

       
            
       
}