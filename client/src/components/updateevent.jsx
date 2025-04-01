import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EventUpdate = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();

  // State to manage form data and loading
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Fetch event data when the component mounts
  useEffect(() => {
    setLoading(true);
    console.log("Event ID from URL:", eventId);
  
    axios.get(`http://localhost:4000/api/events/eventdetails/${eventId}`)
      .then(response => {
        if (response.data && response.data.eventDetails) {
          console.log("Fetched Event Data:", response.data.eventDetails);
          const eventData = response.data.eventDetails;
  
          // Format the date to yyyy-MM-dd
          const formattedDate = new Date(eventData.date).toISOString().split('T')[0];
  
          setEventData({
            title: eventData.title || '',
            description: eventData.description || '',
            date: formattedDate || '',
            time: eventData.time || '',
            venue: eventData.venue || '',
            image: eventData.image || null
          });
        } else {
          setError('Event data is missing or malformed');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching event:", err);
        setLoading(false);
        setError('Failed to fetch event details');
      });
  }, [eventId]);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setEventData({
      ...eventData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('description', eventData.description);
    formData.append('date', eventData.date);
    formData.append('time', eventData.time);
    formData.append('venue', eventData.venue);
    if (eventData.image) {
      formData.append('image', eventData.image);
    }

    axios.put(`http://localhost:4000/api/events/update/${eventId}`, formData)
      .then(response => {
        setSuccess(true);
        setError('');
        setLoading(false);
        setTimeout(() => navigate('/events'), 2000); // Navigate to the events page after a successful update
      })
      .catch(err => {
        setError('Failed to update event');
        setSuccess(false);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" role="status" variant="primary" />
        <span className="ms-2">Loading event...</span>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center">Update Event</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Event updated successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter event description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="venue">
          <Form.Label>Venue</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event venue"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Event Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {eventData.image && (
            <img
              src={typeof eventData.image === 'string' ? eventData.image : URL.createObjectURL(eventData.image)}
              alt="Event"
              style={{ width: '100px', height: '60px', objectFit: 'cover', marginTop: '10px' }}
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Event'}
        </Button>
      </Form>
    </Container>
  );
};

export default EventUpdate;
