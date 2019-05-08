const mongoose = require('mongoose');
const Schema = mongoose.newSchema


const profileSchema = new mongoose.Schema({
    user: String,
    rating: String,
    origin: String,
    date:  Date,
    brewPlace: String,
    roaster: String,
    method: String,
    note1: String,
    note2: String,
    note3: String,
    process: String,
    roastDate: Date,
    waterTemp: String,
    time: String,
    ratio: String
});



const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile

// module.exports.profile = Profile
// module.exports.roast = Roast
