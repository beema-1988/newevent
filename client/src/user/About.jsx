import React from 'react'
import './about.css'

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1> Event Management</h1>
      </header>

      <section className="about-content">
        <h2>Welcome to Our Event Management Platform</h2>
        <p>
          We are dedicated to making event planning easier, more efficient, and stress-free.
          Our platform is designed to help organizers, participants, and vendors seamlessly manage events of all sizes.
        </p>
        <p>
          Whether you are hosting a small meeting, a large conference, or a wedding celebration,
          our solution provides the tools and resources you need to make your event a success.
        </p>

        <h3>Our Mission</h3>
        <p>
          Our mission is to simplify event management by providing an intuitive platform
          that helps you organize every detail, from event creation to guest management, all in one place.
        </p>

        <h3>Features</h3>
        <ul>
          <li>Customizable event pages</li>
          <li>Real-time registration tracking</li>
          <li>Vendor and venue management</li>
          <li>Payment and ticketing system integration</li>
          <li>And much more...</li>
        </ul>
        
        <h3>Contact Us</h3>
        <p>If you have any questions or would like to learn more about how our platform can help you plan your next event, feel free to reach out!</p>
      </section>
    </div>
  );
};

export default About;