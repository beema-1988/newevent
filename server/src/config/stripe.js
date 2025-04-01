const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Set your Stripe secret key

module.exports = stripe;
