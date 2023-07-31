const mongoose = require("mongoose");

const churchDetailsSchema = mongoose.Schema({
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
  },
});

const ChurchDetail = mongoose.model("churchDetails", churchDetailsSchema);
module.exports = ChurchDetail;
