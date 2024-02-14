const Order = require("../Models/Order");

const fetchOrders = async (req, res) => {
  try {
    // fetch Order record
    const orders = await Order.find({ user: req.user });
    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while fetching orders ",
      error,
    });
  }
};
const fetchAllOrders = async (req, res) => {
  try {
    // fetch Order record
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const skip = (page - 1) * limit;
    const orders = await Order.find({}).skip(skip).limit(limit).exec();
    const ordersLength = await Order.find({});
    const totalCount = ordersLength.length;
    return res.status(200).send({ data: orders, totalCount: totalCount });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while fetching orders ",
      error,
    });
  }
};

// createOrder record
const createOrder = async (req, res) => {
  try {
    // createOrder
    console.log(req.body);
    const order = new Order(req.body);
    await order.save();
    return res.status(201).send({
      success: true,
      message: "new order created successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while creating order",
      error: error.message,
    });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updatedData = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }

    res.status(200).send({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).send("Error updating the order: " + error.message);
  }
};

module.exports = {
  fetchOrders,
  createOrder,
  fetchAllOrders,
  updateOrderById,
};
