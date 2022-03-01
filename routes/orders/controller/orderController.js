const Order = require("../model/Order");
const User = require("../../users/model/User");
const { isAlpha, isInt } = require("validator");
const { errorHandler } = require("../../users/utils/errorHandler");

const createOrder = async (req, res) =>  {
  try {
    const { orderName, orderAmount, orderItems } = req.body;
    let errObj = {};

    if (!isAlpha(orderName)) {
      errObj.orderName = "Letters only allowed.";
    }

    if (!isInt(orderAmount)) {
      errObj.orderAmount = "Numbers only allowed.";
    }

    if (Object.keys(errObj).length > 0) {
      return res.status(500).json({ message: "Error", error: errObj });
    }

    const decodedData = res.locals.decodedToken;

    const foundUser = await User.findOne({ email: decodedData.email });

    const newOrder = new Order({
      orderName: orderName,
      orderAmount: orderAmount,
      orderItems: orderItems,
      orderOwner: foundUser.id,
    });

    const savedOrder = await newOrder.save();

    foundUser.orderHistory.push(savedOrder.id);

    await foundUser.save();

    res.status(200).json({ message: "saved new order", payload: savedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorHandler(error));
  }
};

module.exports = { createOrder };
