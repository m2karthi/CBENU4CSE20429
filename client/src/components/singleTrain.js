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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Train Details</h2>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">{train.trainName}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">Train Number: {train.trainNumber}</Typography>
                    <Typography variant="body2">Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</Typography>
                    {/* Display other train details */}
                </CardContent>
            </Card>
        </div>
    );
}

export default SingleTrainPage;
