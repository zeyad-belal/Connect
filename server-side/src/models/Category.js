const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  category_name: { type: String, required: true, unique: true },
  image: { type: Object },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

// create the model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
