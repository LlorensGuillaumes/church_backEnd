const mongoose = require('mongoose');

bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        trim: true,
    },

    password: {
        type: String,
        trim: true,
    },

    rol: {
        type: String,
        trim: true,
        default: "user",
    },
   
});

// userSchema.pre("save", function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }

//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });


const User = mongoose.model("users", userSchema);
module.exports = User;