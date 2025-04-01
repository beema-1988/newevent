const stripe = require('../config/stripe');
const Payment = require('../Models/payment');

const createPaymentIntent = async (amount, currency, userId) => {
  try {
    console.log("Creating payment intent for user:", userId);
    // Create PaymentIntent with amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: currency,
      metadata: { userId: userId },
    });
    console.log("Payment intent created:", paymentIntent);

    // Create Payment record in DB
    const payment = new Payment({
      amount: amount,
      currency: currency,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      userId:userId,
       status: 'pending',
    });

    await payment.save();
    console.log("Payment saved to database:", payment);
    return { paymentIntent, payment };
  } catch (error) {
    throw new Error('Payment creation failed: ' + error.message);
  }
};

 const updatePaymentStatus = async (paymentIntentId, status) => {
 try {
    const payment = await Payment.findOneAndUpdate(
      { paymentIntentId },
      { status },
      { new: true }
    );
console.log("Payment status updated:", payment);
     return payment;
      } catch (error) {
    throw new Error('Failed to update payment status: ' + error.message);
 }
 };
// const updatePaymentStatus = async(req, res) => {
//   const { paymentIntentId } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status === 'succeeded') {
//       // Find payment record in the database
//       const payment = await Payment.findOne({ paymentIntentId });

//       if (payment) {
//         // Update payment status to 'succeeded'
//         payment.status = 'succeeded';
//         await payment.save();
//       }

//       res.send({ status: 'Payment successful' });
//     } else {
//       res.status(400).send({ status: 'Payment failed' });
//     }
//   } catch (error) {
//     console.error('Error confirming payment:', error);
//     res.status(500).send('Internal server error');
//   }
// };

module.exports = {
  createPaymentIntent,
  updatePaymentStatus,
};
