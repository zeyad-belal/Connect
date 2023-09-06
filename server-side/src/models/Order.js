const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  order: [
    {
      service_id: { type: Schema.Types.ObjectId, ref: "Service" },
      quantity: Number
    }
  ],
  created_at: {
    type: Date,
    default: Date.now()
  },
  status:{
    type : String ,
    enum:['pending','inProgress', 'waitingForDelivery','delivered','canceled'],
    default:'pending'
  }
});

// create the model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
