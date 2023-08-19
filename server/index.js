const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

const JOHN_DOE_BASE_URL = 'http://20.244.56.144/train';



// Register your company and obtain credentials
const registrationData = {
    companyName: 'Train Central',
    ownerName: 'karthi',
    ownerEmail: 'm2karthi20@gmail.com',
    rollNo: 'cb.en.u4cse20429',
    accessCode: 'hMkCJZ'
};
const authRequest = {
    companyName: 'Train Central',
    clientId: 'b2b5ee1c-b912-4fec-b494-659edcf2974b',
    ownerName: 'karthikeyan',
    ownerEmail: 'm2karthi20@gmail.com',
    clientSecret: 'lMZxcxWxtuKOMWJP',
    rollNo: 'cb.en.u4cse20429',
};




let authh = JSON.stringify(authRequest)
console.log("stringyfied auth", authh)

// Obtain an authorization token
let authToken = '';

async function getAuthToken() {
    try {
        const response = await axios.post(`${JOHN_DOE_BASE_URL}/auth`, authh);
        authToken = response.data.access_token;
        console.log("authToken", authToken);
    } catch (error) {
        console.error('Error getting authorization token:', error.message);
    }
}

// Fetch train details
async function fetchTrainDetails() {
    try {
        const response = await axios.get(`${JOHN_DOE_BASE_URL}/trains`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching train details:', error.message);
        return [];
    }
}

// Process and filter train data
async function processTrainData() {
    const allTrains = await fetchTrainDetails();
    const currentTime = new Date();

    const filteredTrains = allTrains.filter(train => {
        const departureTime = new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate(),
            train.departureTime.Hours,
            train.departureTime.Minutes,
            train.departureTime.Seconds
        );
        const timeDifference = departureTime - currentTime;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        return minutesDifference >= 30;
    });

    filteredTrains.sort((a, b) => {
        if (a.price.AC === b.price.AC) {
            if (a.price.sleeper === b.price.sleeper) {
                return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
            }
            return a.price.sleeper - b.price.sleeper;
        }
        return a.price.AC - b.price.AC;
    });

    return filteredTrains;
}



// CORS setup to allow requests from the frontend
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Get all Trains
app.get('/train-schedule', async (req, res) => {
    try {
        const processedTrains = await processTrainData();
        res.json(processedTrains);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Single Train
app.get('/train-schedule/:trainNumber', async (req, res) => {
    const { trainNumber } = req.params;
    try {
        const allTrains = await fetchTrainDetails();
        const selectedTrain = allTrains.find(train => train.trainNumber === trainNumber);
        if (!selectedTrain) {
            return res.status(404).json({ error: 'Train not found' });
        }
        res.json(selectedTrain);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    getAuthToken(); // Obtain authorization token on server start
});
