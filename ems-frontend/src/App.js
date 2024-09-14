import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Login from './components/Login';
import EventPage from './pages/Eventpage';
import EventList from './components/EventList';
import Signup from './components/Signup';
import OrganizerDashboard from './components/OrganizerDashboard';

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/events/" element={<EventList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
