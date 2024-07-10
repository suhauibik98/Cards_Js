const mongosse = require("mongoose");

const CardsInfo = mongosse.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:true
  },
  phone:{
    type: String,
    required:true,
  },
  location:{
    type: String,
    required:true,
  }

},{timestamps : true});

const CardsInfoModel = mongosse.model("CardsInfo", CardsInfo);
module.exports = CardsInfoModel;
