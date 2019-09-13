const user = require('../models/users');			

module.exports = {
	updateById: function(req, res, next) {
		user.findByIdAndUpdate(req.params.userId,{
			fullName: req.body.fullName ,
            collage: req.body.collage,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            gender: req.body.gender,
            city: req.body.city,
            password: req.body.password
		}, {new: true}, 
		function(err, movieInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "updated successfully!"});
			}
		});
	},

}					