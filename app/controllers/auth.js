const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {
        user.create({
            fullName: req.body.fullName,
            collage: req.body.collage,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            gender: req.body.gender,
            city: req.body.city,
            password: req.body.password
        }, function (err, result) {
            if (err) next (err);
            else res.json({status: 'success', message: 'User added successfully!!!'});

        });
    },

    authenticate: function(req, res, next) {
        user.findOne({email:req.body.email}, function(err, userInfo){
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
                }else {
                    res.json({status:"error", message: "Invalid email/password!!!"});
                }
            }
        });
    },
}