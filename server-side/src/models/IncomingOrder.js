const mongoose = require("mongoose");

const { Schema } = mongoose;

const incomingOrderSchema = new Schema({
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
const IncomingOrder = mongoose.model("IncomingOrder", incomingOrderSchema);

module.exports = IncomingOrder;
