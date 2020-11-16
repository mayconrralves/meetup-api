import * as Yup from 'yup';

export default async (req, res, next)=> {
	const schema = Yup.object().shape({
		id: Yup.string().required(),
	});
	 try {
 			await schema.validate(req.query, { abortEarly: false });
 			next();
	 }
	 catch(err){
	 	if(process.env.NODE_ENV === 'developement'){
	 		console.log(err);
	 	}
	 		return res.status(400).json({
                error: "Validation fails, query's id is required", 
           });
	 	}
}