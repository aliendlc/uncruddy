const mongoose = require('mongoose');
const Schema = mongoose.newSchema

const profileSchema = new mongoose.Schema({
    rating: String,
    origin: String,
    date:  String,
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

const roastSchema = new mongoose.Schema({
    rating: String,
    origin: String,
    date: String,
    roaster: String,
    roasterMac: String,
    batchSize: String,
    loadTemp: String,
    firCracTime: String,
    firCracTemp: String,
    dropTime: String,
    dropTemp: String,
    finalWeight: String,
    extNot: String
});
const Roast = mongoose.model('Roast', roastSchema);
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile
module.exports = Roast
