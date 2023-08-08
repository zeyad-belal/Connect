const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  order: [
    {
      product_id: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    }
  ],
  created_at: {
    type: Date,
    default: Date.now()
  }
});

// create the model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
