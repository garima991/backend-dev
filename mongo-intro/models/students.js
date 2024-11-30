const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    batch: {
      type: String,
    },
  }, { timestamps: true });
  
  const Students = mongoose.model("Student", schema);
  
  module.exports =  {Students};