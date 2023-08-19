// src/components/AllTrainsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemText, Button } from '@mui/material';

function AllTrainsPage() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/train-schedule')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error fetching train schedule:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>All Trains Schedule</h2>
      <List>
        {trains.map(train => (
          <ListItem key={train.trainNumber}>
            <ListItemText primary={train.trainName} secondary={`Train Number: ${train.trainNumber}`} />
            <Link to={`/trains/${train.trainNumber}`}>
              <Button variant="contained" color="primary">View Details</Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default AllTrainsPage;
