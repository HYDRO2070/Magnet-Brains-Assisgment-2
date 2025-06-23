const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
  stripeProductIds: [
    {
      type: String,
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    required: true,
    enum: ["Completed", "Failed"],
  },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
