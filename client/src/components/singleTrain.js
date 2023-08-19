// src/components/SingleTrainPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

function SingleTrainPage() {
    const { trainNumber } = useParams();
    const [train, setTrain] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/train-schedule/${trainNumber}`)
            .then(response => {
                setTrain(response.data);
            })
            .catch(error => {
                console.error('Error fetching train details:', error);
            });
    }, [trainNumber]);

    if (!train) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            Loading...
        </div>;
    }

    return (
        <div style={{ display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',  height: '100vh' }}>
            <h2>Train Details</h2>
            <Card style={{ width: '400px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                <CardContent>
                    <Typography variant="h5" component="div">{train.trainName}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">Train Number: {train.trainNumber}</Typography>
                    <Typography variant="body2">Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</Typography>
                    <Typography variant="body2">Seats Available - Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</Typography>
                    <Typography variant="body2">Price - Sleeper: {train.price.sleeper}, AC: {train.price.AC}</Typography>
                    <Typography variant="body2">Delayed By: {train.delayedBy} minutes</Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default SingleTrainPage;
