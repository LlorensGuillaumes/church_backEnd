const mongoose = require('mongoose');

const usersDataSchema = mongoose.Schema({
    userId:{
        type: String,
    },

    favourites:[{
        type: mongoose.Schema.ObjectId,
        ref:"churches"
    }],

    votes:[{
        build:{
            type: String,
        },
        data:{
            type: String,
        },
    }],

    language:{
        type:String
    },
})

const UserData = mongoose.model("usersdatas", usersDataSchema);
module.exports = UserData;