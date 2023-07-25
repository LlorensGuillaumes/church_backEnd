const mongoose = require('mongoose');

const churchDetailsSchema = mongoose.Schema({
    church: {
        type: mongoose.Types.ObjectId,
        ref: 'chourches',
        required: true,
        index: true,
    },
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
    detailImages: {
        type: [String],
    }
});

const ChurchDetail = mongoose.model("churcheDetails", churchDetailsSchema);
module.exports = ChurchDetail