const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("toJSON", { virtuals: true });
mongoose.set("toObject", { virtuals: true });

const productSchema = new Schema({
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
  stock_count: {
    type: Number,
    required: true
  },
  brand_id: {
    type: Schema.Types.ObjectId,
    ref: "Brand"
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  best_seller: {
    type: Boolean,
    default: false
  },
  new_price: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

productSchema
  .virtual("new_arrival")
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

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product_id"
});

productSchema.virtual("avg_rating").get(function () {
  let avgRating = 0;
  if (!this.reviews) return avgRating;
  const totalRatings = this.reviews.reduce((acc, cur) => acc + cur.rating, 0);
  avgRating = totalRatings / this.reviews.length;

  return avgRating;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
