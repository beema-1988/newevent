
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { Container, Row, Col, Card ,Button} from "react-bootstrap";

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  // Fetching ticket data from the API
  useEffect(() => {
    axiosInstance
      .get("/tickets/ticketlist")
      .then((res) => {
        console.log("API Response:", res.data);
        // Ensure tickets are correctly set
        setTickets(res.data); // Adjust to match your API's structure
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch tickets.");
      });
  }, []);

  return (
    <div>
      <Container className="mt-4">
        {/* Header Section */}
        <h1 className="mt-4 text-center border border-black rounded-pill bg-black text-white">
          Ticket List
        </h1>
        {/* Display error message if any */}
        {error && <p className="text-danger">{error}</p>}
        {/* Display tickets */}
        <Row>
          {Array.isArray(tickets) && tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Col md={6} lg={4} sm={12} key={ticket._id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Text>Event ID: {ticket.eventId}</Card.Text>
                    <Card.Text>Type: {ticket.type}</Card.Text>
                    <Card.Text>Price: ${ticket.price}</Card.Text>
                    <Card.Text>Promo Code: {ticket.promoCode}</Card.Text>
                    
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No tickets available.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Ticket;
