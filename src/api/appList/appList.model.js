const mongoose = require("mongoose");

const appListSchema = mongoose.Schema({
  centuries: {
    type: [String],
  },
  architectonicStyles: {
    type: [String],
  },

});

const AppList = mongoose.model("applist", appListSchema);
module.exports = AppList;