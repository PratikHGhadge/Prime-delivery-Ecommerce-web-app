const Brand = require("../Models/Brand");
const fetchBrands = async (req, res) => {
  try {
    // fetch brands record
    const brands = await Brand.find({});
    return res.status(200).send({
      success: true,
      brands,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while fetching brands ",
      error,
    });
  }
};

// create Brand record
const createBrand = async (req, res) => {
  try {
    // createBrand
    console.log(" createBrand ");
    const brand = new Brand(req.body);
    await brand.save();
    return res.status(201).send({
      success: true,
      message: "new Brand created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while creating Brand",
      error,
    });
  }
};

module.exports = {
  fetchBrands,
  createBrand,
};
