// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AllTrainsPage from './components/allTrains';
import SingleTrainPage from './components/singleTrain';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<AllTrainsPage/>} />
        <Route path="/trains/:trainNumber" element={<SingleTrainPage/>} />

    </Routes>
  
    </Router>
  );
}

export default App;
