const Category = require("../Models/Category");
const fetchCategories = async (req, res) => {
  try {
    // fetch categories record
    const categories = await Category.find({});
    return res.status(200).send({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while fetching categories ",
      error,
    });
  }
};

// create category record
const createCategory = async (req, res) => {
  try {
    // createCategory
    console.log(" createCategory ");
    const category = new Category(req.body);
    await category.save();
    return res.status(201).send({
      success: true,
      message: "new category created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while creating category",
      error,
    });
  }
};

module.exports = {
  fetchCategories,
  createCategory,
};
