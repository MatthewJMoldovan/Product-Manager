const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "{PATH} is required"],
      minLength: [2, "{PATH} must be at least {MINLENGTH} characters."],
    },
    price: {
      type: String,
      required: [true, "{PATH} is required"],
      minLength: [1, "{PATH} must be at least {MINLENGTH} characters."],
    },
    description: {
      type: String,
      required: [true, "{PATH} is required"],
      minLength: [5, "{PATH} must be at least {MINLENGTH} characters."],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Destination", ProductSchema);

module.exports = { Product: Product };
