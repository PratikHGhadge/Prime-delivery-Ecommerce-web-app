const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Define a virtual property 'id' that returns the '_id'
CartSchema.virtual("id").get(function () {
  return this._id;
});

// Ensure virtual fields are serialized when converted to JSON
CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.CartModel = mongoose.model("CartModel", CartSchema);
