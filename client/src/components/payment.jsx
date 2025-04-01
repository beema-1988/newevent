import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

// Make sure to use your own public Stripe key here
const stripePromise = loadStripe('pk_test_51R4hf92Er7q94asNK09OhlpBxLnJtU2f03w3LuXJkSIh3pU3pU44Qv59bCBgmoJaDhuc5hDadJVX6ziVYYiYgRIU00hG5GKGr5'); // Replace with your public key

const PaymentForm = () => {
  const [amount, setAmount] = useState(100); // amount in cents, default is 100 (1.00 USD)
  const [currency, setCurrency] = useState('usd'); // default is 'usd'
   const [userId, setUserId] = useState('67d002fcf28b445f29384374'); // example user ID
  
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send request to create payment intent and get clientSecret
      const { data } = await axios.post('http://localhost:4000/api/payment/create-payment', {
        amount,
        currency,
        userId,
      });

      setClientSecret(data.clientSecret);  // Save the clientSecret returned from the backend
      console.log('Payment Intent created:', data);

    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Stripe.js has not yet loaded

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error('Error during payment confirmation:', error.message);
      setPaymentStatus('Payment failed');
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent);
      setPaymentStatus('Payment successful');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center">Payment Form</h2>
          <Form onSubmit={handleSubmit}>
            {/* Amount Input */}
            <Form.Group controlId="amount">
              <Form.Label>Amount (in cents):</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                placeholder="Enter amount in cents"
              />
            </Form.Group>

            {/* Currency Input */}
            <Form.Group controlId="currency">
              <Form.Label>Currency:</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  maxLength="3"
                  placeholder="Enter currency code (e.g., USD)"
                />
                <InputGroup.Text>Currency</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create Payment
            </Button>
          </Form>

          {clientSecret && (
            <Form onSubmit={handlePayment}>
              <Form.Group>
                <Form.Label>Card Details</Form.Label>
                <CardElement />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                disabled={!stripe}
                className="w-100 mt-3"
              >
                Confirm Payment
              </Button>
            </Form>
          )}

          {paymentStatus && <div className="mt-3 text-center">{paymentStatus}</div>}
        </Col>
      </Row>
    </Container>
  );
};

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentWrapper;

