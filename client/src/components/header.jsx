import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/features/userSlice';
import axios from 'axios';
import { persistor } from '../redux/store';

function Header() {
  // Access Redux state and hooks
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Logout handler
  const handleLogout = async () => {
    try {
      // Call the user logout API
      const response = await axios.post('http://localhost:4000/api/user/logout', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies for authentication if required
      });

      console.log('Logout API Response:', response.data);

      // Clear Redux persisted state and user state
      await persistor.purge();
      dispatch(clearUser());

      // Redirect to login page
      navigate('/login');
      alert('You have been logged out successfully!');
    } catch (error) {
      // Handle any errors during logout
      console.error('Error during logout:', error.response?.data || error.message);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <div>
      {/* <Navbar bg="light" data-bs-theme="light"> */}
      <Navbar style={{ backgroundColor: 'yellow' }} data-bs-theme="light">
        <Container>
          {/* Application brand/logo */}
          <Navbar.Brand href="/home">EVENT MANAGEMENT</Navbar.Brand>
          {/* Navigation links */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            {/* <Nav.Link as={Link} to="/events">Events</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link> */}
            {userData.user && userData.user.role === 'admin' && (
    <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
  )}
  {userData.user && userData.user.role === 'user' && (
    <Nav.Link as={Link} to="/user-dashboard">user Dashboard</Nav.Link>
  )}
          </Nav>
          {/* Conditional rendering for user login/logout */}
          {userData.user && Object.keys(userData.user).length > 0 ? (
            <div>
              <span className="me-3">Welcome, {userData.user.name}!</span>
              <Button onClick={handleLogout} variant="outline-danger" className="ms-2">
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/login')} variant="primary">
              Join us
            </Button>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;