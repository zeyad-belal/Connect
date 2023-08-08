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
  details: {
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
  best_seller: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

serviceSchema.virtual("new_arrival")
  .get(function () {
    const oneDay = 1000 * 3600 * 24;
    const curDate = new Date();
    const differenceInTime = curDate - this.created_at;

    const differenceInDays = differenceInTime / oneDay;
    if (differenceInDays <= 30) return true;
    else return false;
  })
  .set(function (v) {
    return this.set(v);
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
