const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/student';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;