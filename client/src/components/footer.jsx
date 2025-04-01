import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    // <footer className="bg-light text-black p-4">
    // <footer style={{ backgroundColor: 'yellow' }} className="text-black p-4">
    <footer style={footerStyle} className="text-black p-4">
      <Container>
        <Row>
          <Col md="6">
            <h5>MyApp</h5>
            <p>&copy; 2025 MyApp. All rights reserved.</p>
          </Col>
          <Col md="6" className="text-md-right">
            <ul className="list-unstyled">
              <li><a href="#home" className="text-black">Home</a></li>
              <li><a href="#about" className="text-black">About</a></li>
              <li><a href="#contact" className="text-black">Contact</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
const footerStyle = {
  backgroundColor: 'yellow',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  left: 0,
  zIndex: 1000,
};

export default Footer;
