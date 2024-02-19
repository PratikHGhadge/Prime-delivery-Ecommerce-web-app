const Razorpay = require("razorpay");
const Payment = require("../Models/Payment");
const crypto = require("crypto");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
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

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.redirect(
        `${process.env.CLIENT_BASE_URL}/order-success/${razorpay_payment_id}`
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while  payment verification",
      error,
    });
  }
};

module.exports = { checkout, paymentVerification };
