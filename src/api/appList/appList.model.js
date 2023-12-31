const mongoose = require("mongoose");

const appListSchema = mongoose.Schema({
  centuries: {
    type: [String],
  },
  architectonicStyles: {
    type: [String],
  },
  buildingTypes: {
    type:[String],
  },
  detailType:{
    type:[String],
  }

});

const AppList = mongoose.model("applist", appListSchema);
module.exports = AppList;