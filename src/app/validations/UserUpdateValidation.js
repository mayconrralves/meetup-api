import * as Yup from 'yup';
import 'dotenv/config';


 export default async ( req, res, next ) => {
 		const schema = Yup.object().shape({
	            name: Yup.string(),
	            email: Yup.string().email(),
	            oldPassword: Yup.string().min(6),
	            password: Yup.string().min(6).when('oldPassword',(oldPassword, field)=>(
	                oldPassword ? field.required(): field
	        )),
	            confirmPassword: Yup.string().when('password',(password, field)=> (
	                password ? field.required().oneOf([Yup.ref('password')]): field
	            ))
        });
 	try {
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