const { Cart } = require("../Models/Cart");

const addToCart = async (req, res) => {
  try {
    const cartItem = new Cart({
      product: req.body.product.id,
      quantity: req.body.quantity,
      user: req.user,
    });
    const savedCartItem = await cartItem.save();

    // Populate the 'product' field with data from the Product model
    const populatedCartItem = await Cart.findById(savedCartItem._id).populate(
      "product"
    );

    return res.status(201).send({
      response: populatedCartItem,
      success: true,
      message: "Product added into cart successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while adding product into cart",
      error: error.message, // Send error message for better debugging
    });
  }
};

const fetchCartByUser = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate(
      "product"
    );
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
    const cartItemId = req.params.id;
    const response = await Cart.findByIdAndDelete(cartItemId);
    // Check if item was not found
    if (!response) {
      return res.status(404).send({
        success: false,
        message: "Item not found in the cart.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Item deleted successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while deleting item.",
      error: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    // Populate the 'product' field with data from the Product model
    const populatedCartItem = await Cart.findById(cart._id).populate("product");
    return res.status(200).send({
      data: populatedCartItem,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in while updating product ",
      error: error.message,
    });
  }
};

module.exports = { addToCart, fetchCartByUser, deleteFromCart, updateCart };
