const mongoose = require('mongoose');


var rooms = new mongoose.Schema({
    name: String,
    description : String
})

module.exports = mongoose.model('rooms', rooms);