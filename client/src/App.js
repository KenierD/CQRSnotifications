import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotificationView from './NotificationView'; // Asegúrate de que la ruta sea correcta
import Home from './Home'; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/notifications" />} />
        <Route path="/notifications" element={<NotificationView />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

