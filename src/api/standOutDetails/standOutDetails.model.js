const mongoose = require("mongoose");

const standOutDetailsSchema = mongoose.Schema({
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
});

const StandOutDetails = mongoose.model("churchDetails", standOutDetailsSchema);
module.exports = StandOutDetails;
