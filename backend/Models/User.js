const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: false },
  role: { type: String, required: true, default: "user" },
  addresses: { type: [mongoose.Schema.Mixed] },
  name: { type: String },
  orders: { type: [mongoose.Schema.Mixed] },
  salt: Buffer,
});

// Define a virtual property 'id' that returns the '_id'
UserSchema.virtual("id").get(function () {
  return this._id;
});

// Ensure virtual fields are serialized when converted to JSON
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("User", UserSchema);
