const { string } = require("joi");
const mongoose = require("mongoose");
const { any } = require("../utils/multer");

const { Schema } = mongoose;

const orderSchema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
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
      time:{
        type: Array,
      },
      status:{
        type : String ,
        enum:['pending','inProgress','delivered','canceled'],
        default:'pending'
      },
    }
  ], 
  created_at: {
    type: Date,
    default: Date.now()
  },
  seller:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  chatHistory:{
    type: Array,
    default: [],
  },
  reviewed:{
    type: Boolean,
    default: false,
  }

});

// create the model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
