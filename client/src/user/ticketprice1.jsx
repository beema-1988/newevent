import React, { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom"; // To extract dynamic route parameters
import { Container, Table, Alert, Spinner,Button } from "react-bootstrap";

const Tickets = () => {
  const { eventId } = useParams(); // Dynamically get the eventId from the route
  const [tickets, setTickets] = useState([]); // State to hold ticket data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ticket details for the given eventId
    const fetchTickets = async () => {
      try {
        if (!eventId) {
          throw new Error("Invalid event ID"); // Handle missing eventId
        }

        const response = await fetch(
          `http://localhost:4000/api/tickets/event/${eventId}` // Use dynamic eventId
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Parse the response JSON
        setTickets(data); // Set the ticket data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTickets();
  }, [eventId]); // Dependency array to trigger useEffect when eventId changes

  // Render a loading spinner while fetching data
  if (loading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Render an error alert if there was an issue fetching data
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Render the ticket table
  return (
    <Container className="mt-4">
      <h2>Available Tickets</h2>
      {tickets.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.type}</td>
                <td>${ticket.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      ) : (
        <Alert variant="info">No tickets available for this event.</Alert>
      )}
      <Button onClick={() => navigate('/payment')} variant="primary">
                    Payment
                  </Button>
    </Container>
  );
};

export default Tickets;
