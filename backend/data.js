
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    message:  String,
    createdBy: String,
    readBy: String
     
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);