import * as Yup from 'yup';
import regexDate from '../../config/regexDate';

 export default async ( req, res, next ) => {
 	try {
 			const schema = Yup.object().shape({
	            localization: Yup.string().required(),
	            description: Yup.string().required(),
	            date: Yup.string().matches(regex_date).required(),
	            banner_id: Yup.string().required(),
        	});

 			await schema.validate(req.body, { abortEarly: false });

 			return next();
	 }
	 catch(err){
	 		return res.status(400).json({
                error: 'Validation fails', 
                messages: err.inner
           });
	 	}
 	
 }