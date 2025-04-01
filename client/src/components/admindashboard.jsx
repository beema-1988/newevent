import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  return (


    <Container>

      <h1>Welcome to Admin Dashboard!</h1>
      <Row>
        

        {/* First Column */}
        <Col md={4}>
        <Button onClick={() => navigate('/createevents')} variant="primary" >
          Create Events
        </Button>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>MANAGE EVENTS</Card.Title>
              <Card.Text>
                {/* Add text here if needed */}
              </Card.Text>
              <Button onClick={() => navigate('/EventList')} variant="primary">
                events
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Second Column */}
        <Col md={4}>
        <Button onClick={() => navigate('/createticket')} variant="primary" >
          Create Tickets
        </Button>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>MANAGE TICKETS</Card.Title>
              <Card.Text>
                {/* Add text here if needed */}
              </Card.Text>
              <Button onClick={() => navigate('/ticketlist')} variant="primary" >
          View Tickets
        </Button>
            </Card.Body>
          </Card>
        </Col>


        <Col md={4}>
        <Button onClick={() => navigate('/signup')} variant="primary" >
          Create users
        </Button>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>MANAGE USERS</Card.Title>
              <Card.Text>
                {/* Add text here if needed */}
              </Card.Text>
              <Button onClick={() => navigate('/userslist')} variant="primary" >
          View users
        </Button>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Container>
  );
}

export default AdminDashboard;