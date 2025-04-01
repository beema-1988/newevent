import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate} from 'react-router-dom'; // Add this import

function UserDashboard() {

  const navigate = useNavigate(); // Use the navigate hook from react-router-dom
  
  return (
    <Container>
      <h1>Welcome to User Dashboard!</h1>
      <Row>
        {/* First Column */}
        <Col md={4}>
          {/* <Button onClick={() => navigate('/events')} variant="primary">
            Create Events
          </Button> */}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>EVENTS LIST</Card.Title>
              <Card.Text>
                {/* Add text here if needed */}
              </Card.Text>
              <Button onClick={() => navigate('/events')} variant="primary">
                View Events
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Second Column */}
        <Col md={4}>

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>TICKETS LIST</Card.Title>
              <Card.Text>
                {/* Add text here if needed */}
              </Card.Text>
              <Button onClick={() => navigate('/tickets')} variant="primary">
                View Tickets
              </Button>
              {/* You can add additional buttons or content here */}
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Container>
  );
}

export default UserDashboard;
