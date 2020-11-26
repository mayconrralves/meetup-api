const exp = /(\.jpg$)|(\.jpeg$)|(\.gif$)|(\.png$)|(\.jfif$)|(\.svg$)/;
export default (req, res, next) => {
	
	if(!req.file){
		return res.status(400).json({ error:  "File cannot be empty"});
	}
	if(!req.file.originalname.match(exp)){
		return res.status(400).json({error: "The file type isn't supported. Must be png/jpg/gif/jpeg/jfif/svg"});
	}

	next();
}