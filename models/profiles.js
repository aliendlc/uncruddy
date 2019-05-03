const mongoose = require('mongoose');
const Schema = mongoose.newSchema

const profileSchema = new mongoose.Schema({
    rating: Number,
    origin: String,
    date: String,
    brewPlace: String,
    roaster: String,
    method: String,
    note1: String,
    note2: String,
    note3: String,
    process: String,
    roastDate: String,
    ratio: String
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile
