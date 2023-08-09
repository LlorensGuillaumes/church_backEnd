mongoose = require("mongoose");
bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },

    rol: {
        type: String,
        trim: true,
        required: true,
        default: "user",
    },
});

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;