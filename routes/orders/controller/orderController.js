const Order = require("../model/Order");
const User = require("../../users/model/User");
const { isAlpha, isInt } = require("validator");
const { errorHandler } = require("../../users/utils/errorHandler");

//Create a new order
const createOrder = async (req, res) => {
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

//Get all orders created by the curernt user
const getAllOrders = async (req, res) => {
  try {
    const decodedData = res.locals.decodedToken;

    const foundUser = await User.findOne({ email: decodedData.email });
    if (!foundUser) throw { message: "User not found." };

    const allOrders = await Order.find({ orderOwner: foundUser.id });

    res.status(200).json({ message: "All orders.", payload: allOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorHandler(error));
  }
};

const deleteOrder = async (req, res) => {
  //delete both the order, and the order id from the users updateProfile
  //save the user profile again, after deleting it

  try {
    const decodedData = res.locals.decodedToken;
    const foundUser = await User.findOne({ email: decodedData.email });
    const deleteInput = req.body.orderName;
    const tempOrder = await Order.find({ orderName: deleteInput });

    const deletingID = tempOrder[0].id;

    const orderToDelete = await Order.findByIdAndRemove({
      _id: deletingID
    });

    const removeThis = foundUser.orderHistory.pull(deletingID);

    await foundUser.save();

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorHandler(error));
  }
};

//hw
//orderupdate tonight!!

module.exports = { createOrder, getAllOrders, deleteOrder };
