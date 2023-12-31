const mongoose = require('mongoose');
const ChurchDetail = require("../standOutDetails/standOutDetails.model")

const churchSchema = mongoose.Schema({
    name: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
    },
    townLocation: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    locationGPS: {
        type: [String],
        required: true,
    },
    architectonicStyle: {
        type: [String],
    },
    century: {
        type: [String],
    },
    images: {
        type: [String],
    },
    
    web: {
        type: String,
    },
    property: {
        type: String,
    },
    churchDetail: [{
        detailType: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        year: {
            type: String,
        },
    }],
    buildType:{
        type: String,
        required: true,
    },  
    puntuation:[{
        type: Number,
        default: 1,
    }],
});

const Church = mongoose.model("churches", churchSchema);
module.exports = Church;
