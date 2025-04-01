import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/features/userSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle login
  const userLogin = async () => {
    const formData = { email, password };

    // Determine the login URL based on the selected role
    const loginUrl =
      role === 'admin'
        ? 'http://localhost:4000/api/admin/login'
        : 'http://localhost:4000/api/user/login';

    try {
      const response = await axios.post(loginUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = response.data.token; // Assuming the token is returned in the 'token' field of the response
if (token) {
  localStorage.setItem('token', token); // Save the token to localStorage
}

      console.log(response.data, 'Response from API');

      // Check if the response contains `user` or `adminExist`
      const userData = response.data.user || response.data.adminExist;

      if (userData) {
        // Store the token and user info in localStorage
        localStorage.setItem('token', response.data.token); // Save the token
        localStorage.setItem('user', JSON.stringify(userData)); // Save the user data

        alert('Login successful!');
        dispatch(saveUser(userData)); // Save user to Redux
        console.log(userData, 'User data being saved to Redux');

        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/admin-dashboard'); // Redirect to admin dashboard
        } else if (userData.role === 'user') {
          navigate('/user-dashboard'); // Redirect to user event page
        }
      } else {
        console.error('Unexpected response structure:', response.data);
        alert('Failed to process login. Please contact support.');
      }
    } catch (error) {
      console.error('Axios Error:', error.response?.data || error.message);
      setError('Login failed. Please check your credentials and try again.');
      alert('Login failed. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin();
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button variant="primary" type="submit">
          Login
        </Button>
        <div className="text-center mt-3">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
