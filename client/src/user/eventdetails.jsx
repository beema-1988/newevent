import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom"; // To extract route parameters
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap"; // Bootstrap components
import { useDispatch } from "react-redux"; // For Redux actions



const EventDetails = () => {
  const { eventId } = useParams(); // Extract the "eventId" parameter from the route
  const [event, setEvent] = useState(null); // State for event details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const navigate = useNavigate();

  // Fetch event details when the component mounts
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (!eventId) {
          throw new Error("Invalid event ID");
        }

        const response = await fetch(
          `http://localhost:4000/api/events/eventdetails/${eventId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setEvent(data.eventDetails); // Set the event details
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message); // Set error state
        setLoading(false); // Stop loading
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Handle adding the event to the cart
  // const addToCart = (event) => {
  //   dispatch({ type: "ADD_TO_CART", payload: event }); // Dispatch Redux action
  //   alert(`${event.title} has been added to the cart!`); // Notify user
  // };

  // Show a loading spinner while data is being fetched
  if (loading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Show an error message if something goes wrong
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
 

  // Render the event details
  return (
    <Container className="mt-4">
      {event && (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={event.image} alt={`${event.title} Image`} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {event.description}
            </Card.Text>
            <Card.Text>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </Card.Text>
            <Card.Text>
              <strong>Time:</strong> {event.time}
            </Card.Text>
            <Card.Text>
              <strong>Venue:</strong> {event.venue}
            </Card.Text>
            {/* <Button variant="success" onClick={() => addToCart(event)}>
              Add to Cart
            </Button> */}
            <Button onClick={() => navigate(`/api/tickets/event/${event._id}`)} variant="primary">
              Ticket Info
            </Button> 
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default EventDetails;




