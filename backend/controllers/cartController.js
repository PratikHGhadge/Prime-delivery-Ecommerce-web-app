const Cart = require("../Models/Cart");

const addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    return res.status(201).send({
      success: true,
      message: "Product added into cart successfully ",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in while adding product into cart",
      error,
    });
  }
};

const fetchCartByUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const cartItems = await Cart.find({ user: userId });
    return res.status(200).send({
      cartItems,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in while fetching cart by userId",
      error,
    });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const response = await Cart.findByIdAndDelete(cartItemId);
    return res.status(200).send({
      response,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while deleting item",
      error,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while ",
      error,
    });
  }
};
module.exports = {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCart,
};
