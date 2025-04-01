import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import { axiosInstance } from '../axios/axiosInstance';
import { Container, Row, Col, Card, Button } from "react-bootstrap"

const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    // axiosInstance.get("/events/eventlist")
    axios.get('http://localhost:4000/api/events/eventlist')
      .then((res) => {
        console.log("API Response:", res.data);
        setEvents(res.data.eventList); // Access the eventList array
      })
      .catch((err) => console.error(err));
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Container className="mt-4">
        <h1 className="mt-4 text-center border border-black rounded-pill bg-black text-white"  >Events list</h1>
        <Row>
          {Array.isArray(events) ? (
            events.map((event) => (
               <Col md={6} lg={4} sm={12} key={event._id}>
                {/* //  <Col md={6} lg={4} sm={12} key={eventId }> */}
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={event.image} alt={event.title} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    {/* <Button as={Link} to={`/event/${event.id}`} variant="primary">
                      Event Details
                    </Button> */}
                    <Button onClick={() => navigate(`/api/events/eventdetails/${event._id }`)} variant="primary">
                      Event Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No events available.</p>
          )}

        </Row>


      </Container>
    </div>
  )
}


export default Events