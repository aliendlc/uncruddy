const mongoose = require('mongoose');
const Schema = mongoose.newSchema

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
module.exports = Roast
