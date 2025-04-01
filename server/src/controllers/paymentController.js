const paymentService = require('../services/paymentService');

const createPayment = async (req, res) => {
  try {
    console.log('Received create-payment request:', req.body);
    const { amount, currency, userId } = req.body;
    if (!amount || !currency || !userId) {
      return res.status(400).json({ success: false, message: 'Missing required fields: amount, currency, or userId' });
    }
    const { paymentIntent, payment } = await paymentService.createPaymentIntent(amount, currency, userId);
    res.status(200).json({
      success: true,
      paymentIntentId: payment.paymentIntentId,
      clientSecret: payment.clientSecret,
    });
  } catch (error) {
    console.error('Error during payment creation:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    console.log('Received update-payment-status request:', req.body);
    const { paymentIntentId, status } = req.body;
    if (!paymentIntentId || !status) {
      return res.status(400).json({ success: false, message: 'Missing required fields: paymentIntentId or status' });
    }
     // Find the payment by paymentIntentId and update the status
    //  const payment = await Payment.findOneAndUpdate(
    //   { paymentIntentId },
    //   { status },
    //   { new: true } // Return the updated document
    // );
     const payment = await paymentService.updatePaymentStatus(paymentIntentId, status);
    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error('Error during status update:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPayment,
  updatePaymentStatus,
};
