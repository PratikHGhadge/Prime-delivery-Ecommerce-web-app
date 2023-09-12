const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "wrong min price"],
    max: [10000, "wrong max price"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong discount percentage"],
    max: [100, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong in min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "wrong min stock"],
    max: [1000, "wrong max stock"],
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
});

// Define a virtual property 'id' that returns the '_id'
ProductSchema.virtual("id").get(function () {
  return this._id;
});

// Ensure virtual fields are serialized when converted to JSON
ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Product", ProductSchema);
