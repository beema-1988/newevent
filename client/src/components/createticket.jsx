import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap'; // Importing React Bootstrap components

function CreateEventTicket() {
  const [eventId, setEventId] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:4000/api/tickets/create', {
        eventId,
        type,
        price,
        promoCode,
        paymentStatus
      });

      // Handle success
      setSuccessMessage('Ticket successfully created!');
      console.log(response.data);
    } catch (err) {
      // Handle error
      setError('Error creating ticket: ' + err.response.data.error);
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create Event Ticket</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="eventId">
          <Form.Label>Event ID</Form.Label>
          <Form.Control
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            placeholder="Enter Event ID"
          />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            placeholder="Enter Type"
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter Price"
          />
        </Form.Group>

        <Form.Group controlId="promoCode">
          <Form.Label>Promo Code</Form.Label>
          <Form.Control
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            required
            placeholder="Enter Promo Code"
          />
        </Form.Group>

        <Form.Group controlId="paymentStatus">
          <Form.Label>Payment Status</Form.Label>
          <Form.Control
            type="text"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
            placeholder="Enter Payment Status"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create Ticket
        </Button>
      </Form>

      {/* Success and error messages */}
      {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </div>
  );
}

export default CreateEventTicket;

