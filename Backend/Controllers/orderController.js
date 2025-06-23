const Order = require("../models/orders");

exports.createOrder = async (req, res, next) => {
    const task = await new Order({
      ...req.body,
    }).save();

    res.status(200).json({
        success: true,
        task,
        message: "Order created successfully",
      });
}
  