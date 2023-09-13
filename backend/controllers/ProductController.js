const Product = require("../Models/Product");

const createProduct = async (req, res) => {
  try {
    // save product record
    console.log("create product ");
    const product = new Product(req.body);
    await product.save();
    return res.status(201).send({
      success: true,
      message: "new record created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while creating product",
      error,
    });
  }
};

const fetchProduct = async (req, res) => {
  try {
    // fetch product record
    let conditions = {};
    console.log(req.query.category);
    if (req.query.category) {
      conditions.category = { $in: req.query.category };
    }
    console.log(req.query.brand);
    if (req.query.brand) {
      conditions.brand = { $in: req.query.brand };
    }

    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(conditions)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalProducts = await Product.countDocuments(conditions);

    return res.status(200).send({
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
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
    console.log(id);
    const product = await Product.findById(id);

    return res.status(200).send({
      success: true,
      product,
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

module.exports = {
  createProduct,
  fetchProduct,
  fetchProductById,
};
