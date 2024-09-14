import React from 'react';
import EventList from '../components/EventList';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">EventEase</h1>
    <Navbar className="navbar" />
    <EventList className="event-list" />
  </div>
);

export default Home;
