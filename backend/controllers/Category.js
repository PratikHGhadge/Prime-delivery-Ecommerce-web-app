const Category = require("../Models/Category");
const fetchCategories = async (req, res) => {
  try {
    // fetch categories record
    const categories = await Category.find({});
    return res.status(200).send(categories);
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
    if (Category.find({ label: req.body.label })) {
      return res.status(201).send({
        success: true,
        message: "category already exists",
      });
    }
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
