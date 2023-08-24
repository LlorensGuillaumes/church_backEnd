const mongoose = require('mongoose');

const TownSchema = new mongoose.Schema(
    {
        country:{
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true, 
        },
        region: {
            type: String,
            required: true,
        },
        location: {
            type:[String],
            required:true,   
        },
    },
)

const town = mongoose.model('towns', TownSchema);

module.exports = town;