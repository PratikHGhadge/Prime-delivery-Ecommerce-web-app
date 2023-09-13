const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

// Define a virtual property 'id' that returns the '_id'
BrandSchema.virtual("id").get(function () {
  return this._id;
});

// Ensure virtual fields are serialized when converted to JSON
BrandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Brand", BrandSchema);
