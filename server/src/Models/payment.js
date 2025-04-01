const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'usd', // Default to USD if not provided
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed'],
      default: 'pending', // Status can be 'pending', 'succeeded', or 'failed'
    },
    userId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Mongoose will automatically add createdAt and updatedAt
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
