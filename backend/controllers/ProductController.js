const Product = require("../Models/Product");

const createProduct = async (req, res) => {
  try {
    // save product record
    const product = new Product(req.body);
    const response = await product.save();
    return res.status(201).send({
      response,
      success: true,
      message: "new product record created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while creating product",
      error: error.message,
    });
  }
};

const fetchProduct = async (req, res) => {
  try {
    // fetch product record
    let conditions = {};
    if (req.query.category) {
      conditions.category = { $in: req.query.category };
    }
    if (req.query.brand) {
      conditions.brand = { $in: req.query.brand };
    }

    if (req.query.title) {
      conditions.title = {
        $regex: `${req.query.title}`,
        $options: "i",
      };
    }

    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(conditions)
      .skip(skip)
      .limit(limit)
      .exec();
    const productsLength = await Product.find({});
    const totalCount = productsLength.length;

    // const totalProducts = await Product.countDocuments(conditions);

    return res.status(200).send({ data: products, totalCount: totalCount });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while fetching product",
      error,
    });
  }
};

const fetchProductById = async (req, res) => {
  try {
    // fetch product record
    const { id } = req.params;
    const product = await Product.findById(id);

    return res.status(200).send({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while fetching product by id",
      error,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.status(200).send({ success: true, updatedProduct });
  } catch (error) {
    res.status(500).send("Error updating the product: " + error.message);
  }
};

module.exports = {
  createProduct,
  fetchProduct,
  fetchProductById,
  updateProductById,
};
