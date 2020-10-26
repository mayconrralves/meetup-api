
class CSRFController {

	index(req, res){
		return res.json({csrf: req.csrfToken()});
	}
}


export default new CSRFController();