import * as Yup from 'yup';
import regexDate from '../../config/regexDate';
import 'dotenv/config';

 export default async ( req, res, next ) => {
 	 const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });
     try {
 			await schema.validate(req.body, { abortEarly: false });
 			next();
	 }
	 catch(err){
	 	if(process.env.NODE_ENV === 'developement'){
	 		console.log(err);
	 	}
	 		return res.status(400).json({
                error: 'Validation fails', 
           });
	 	}
 	
 }