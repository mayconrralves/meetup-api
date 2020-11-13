import * as Yup from 'yup';
import 'dotenv/config';


 export default async ( req, res, next ) => {
 	try {
 			const schema = Yup.object().shape({
	            name: Yup.string().required(),
	            email: Yup.string().email().required(),
	            password: Yup.string().min(6).required(),
	            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')]),
        	});


 			await schema.validate(req.body, { abortEarly: false });

 			return next();
	 }
	 catch(err){
	 	if(process.env.NODE_ENV === 'developement'){
	 			console.log(err);
	 	}
	 	return res.status(400).json({error: 'Validations Errors'}); 
	 }
 	
 }