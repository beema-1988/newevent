const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to create a payment intent
router.post('/create-payment', paymentController.createPayment);

// Route to update payment status (e.g., after successful payment)
router.post('/update-payment-status', paymentController.updatePaymentStatus);

module.exports = router;
