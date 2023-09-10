const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      service_id: { type: Schema.Types.ObjectId, ref: "Service" },
      quantity:{
        type: Number
      },
      extras:{
        type: Array,
        default: []
      },
      price:{
        type: Number
      },
      status:{
        type : String ,
        enum:['pending','inProgress', 'waitingForDelivery','delivered','canceled'],
        default:'pending'
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now()
  },

});

// create the model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
