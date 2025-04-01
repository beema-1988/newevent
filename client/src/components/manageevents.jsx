import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);  // State to store events data
  const [loading, setLoading] = useState(true);  // State to handle loading state
  const [error, setError] = useState(null);  // State to handle error state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from API
    axios.get('http://localhost:4000/api/events/eventlist')
      .then(res => {
        setEvents(res.data.eventList);  // Save events data in state
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(err => {
        setError(err.message);  // Set error if there's any issue
        setLoading(false);  // Set loading to false after error is handled
      });
  }, []);

  // Delete event handler
  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axios.delete(`http://localhost:4000/api/events/delete/${eventId}`)
        .then(() => {
          // Remove the deleted event from state
          setEvents(events.filter(event => event._id !== eventId));
        })
        .catch(err => {
          setError('Error deleting event: ' + err.message);
        });
    }
  };

  // Update event handler (navigate to the update page or open a modal)
  const handleUpdate = (eventId) => {
     navigate(`/api/events/update/${eventId}`);
      // navigate(`/EventUpdate/${eventId}`);
  };

  // If loading, show a spinner
  if (loading) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" role="status" variant="primary" />
        <span className="ms-2">Loading events...</span>
      </Container>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <Container className="mt-5">
        <h4 className="text-danger">Error: {error}</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mt-4 text-center border border-black rounded-pill bg-black text-white">
        Eventmanagement
      </h1>

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                  />
                </td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.time}</td>
                <td>{event.venue}</td>
                <td>
                  {/* Update Button */}
                  <Button
                    onClick={() => handleUpdate(event._id)}
                    variant="warning"
                    className="me-2"
                  >
                    Update
                  </Button>
                  {/* Delete Button */}
                  <Button
                    onClick={() => handleDelete(event._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No events available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EventList;

