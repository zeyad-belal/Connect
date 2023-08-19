const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("toJSON", { virtuals: true });
mongoose.set("toObject", { virtuals: true });

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description:{
    type : String,
    required : true
  },
  keywords:{
    type : Array
  },
  time:{
    type : String,
    required : true
  },
  extras: {
    type: Object,
    default: {}
  },
  images: {
    type: Array
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});


  serviceSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "service_id"
});

serviceSchema.virtual("avg_rating").get(function () {
  let avgRating = 0;
  if (!this.reviews) return avgRating;
  const totalRatings = this.reviews.reduce((acc, cur) => acc + cur.rating, 0);
  avgRating = totalRatings / this.reviews.length;

  return avgRating;
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
