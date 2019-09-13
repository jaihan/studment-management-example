const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    collage: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

UserSchema.pre('save', function(next){
    const user = this
    if (user.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);