import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const UpdateTicket = () => {
  const { ticketId } = useParams(); // Get ticketId from URL
  const navigate = useNavigate(); // Use useNavigate for navigation
  
  // State to manage form inputs
  // const [eventId, setEventId] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  
  // State to manage loading, success, and error messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch ticket details if needed (optional, if you want to pre-fill the form)
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tickets/ticketdetails/${ticketId}`);
        const ticket = response.data;
        // setEventId(ticket.eventId);
        setType(ticket.type);
        setPrice(ticket.price);
        setPromoCode(ticket.promoCode);
        setPaymentStatus(ticket.paymentStatus);
      } catch (err) {
        setError('Failed to fetch ticket details');
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.put(`http://localhost:4000/api/tickets/update/${ticketId}`, {
        // eventId,
        type,
        price,
        promoCode,
        paymentStatus,
      });

      setMessage('Ticket updated successfully!');
      // Redirect to a success page (for example: the ticket details page)
      setTimeout(() => {
        console.log("Redirecting to tickets page");
        navigate('/ticketlist');  // Redirect to tickets list page after successful update
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (err) {
      setError('Failed to update ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Update Ticket</h1>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* <Form.Group controlId="eventId">
          <Form.Label>Event ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          />
        </Form.Group> */}

        <Form.Group controlId="type">
          <Form.Label>Ticket Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Ticket Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="promoCode">
          <Form.Label>Promo Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="paymentStatus">
          <Form.Label>Payment Status</Form.Label>
          <Form.Control
            as="select"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Ticket'}
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateTicket;

