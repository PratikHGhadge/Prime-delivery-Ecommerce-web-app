// const CartSchema = require("./Cart");
const Product = require("../Models/Product");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema(
  {
    products: [{ type: [Schema.Types.Mixed], required: true }],
    totalSum: { type: Number },
    totalItem: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    payment: { type: String, required: true },
    status: { type: String, default: "pending" },
    selectedAddress: { type: [Schema.Types.Mixed], required: true },
  },
  { timestamps: true }
);

// Define a virtual property 'id' that returns the '_id'
OrderSchema.virtual("id").get(function () {
  return this._id;
});

// Ensure virtual fields are serialized when converted to JSON
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("Order", OrderSchema);
