const express = require("express");
const router = express.Router();
const { jwtMiddleware } = require("../users/lib/authMiddleware/index");
const { createOrder, getAllOrders, deleteOrder } = require("./controller/orderController");

router.get("/", (req, res) => {
  res.send("Hello from the order Router");
});

router.post("/create-order", jwtMiddleware, createOrder);

router.get("/get-all-orders", jwtMiddleware, getAllOrders);

router.delete("/delete-order", jwtMiddleware, deleteOrder);

module.exports = router;
