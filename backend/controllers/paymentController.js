const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 1.0), // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).send({ success: "true", data: order });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while doing online payment ",
      error,
    });
  }
};

module.exports = { checkout };
