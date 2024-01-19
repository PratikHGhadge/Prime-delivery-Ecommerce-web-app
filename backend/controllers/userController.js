const User = require("../Models/User");

const fetchUserById = async (req, res) => {
  try {
    // fetch product record
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id, "name email id").exec();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while fetching product by id",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(updateUser);
  } catch (error) {
    res.status(500).send("Error while updating the user: " + error.message);
  }
};

module.exports = {
  fetchUserById,
  updateUser,
};
