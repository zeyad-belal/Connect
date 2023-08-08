const mongoose = require("mongoose");

const { Schema } = mongoose;

const brandSchema = new Schema({
  brand_name: { type: String, required: true, unique: true },
  image: { type: Object },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
