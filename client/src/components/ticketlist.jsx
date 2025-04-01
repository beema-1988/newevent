import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { Container, Table, Button } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ticketlist = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


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

  // Function to handle delete
  const handleDelete = (ticketId) => {
    // Call delete API endpoint to remove the ticket
    axios.delete(`http://localhost:4000/api/tickets/delete/${ticketId}`)
      .then((res) => {
        console.log("Ticket deleted:", res);
        // Update tickets list after deletion
        setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete ticket.");
      });
  };

  // Function to handle update (this would navigate to an update page)
  const handleUpdate = (ticketId) => {
    navigate(`/tickets/update/${ticketId}`);  // This is correct
  };
  

  return (
    <div>
      <Container className="mt-4">
        {/* Header Section */}
        <h1 className="mt-4 text-center border border-black rounded-pill bg-black text-white">
          Ticket List
        </h1>
        {/* Display error message if any */}
        {error && <p className="text-danger">{error}</p>}

        {/* Table displaying ticket details */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Type</th>
              <th>Price</th>
              <th>Promo Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tickets) && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.eventId}</td>
                  <td>{ticket.type}</td>
                  <td>${ticket.price}</td>
                  <td>{ticket.promoCode}</td>
                  <td>
                    {/* Update and Delete buttons */}
                    <Button
                      variant="warning"
                      onClick={() => handleUpdate(ticket._id)}
                      className="mr-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(ticket._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No tickets available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Ticketlist;
