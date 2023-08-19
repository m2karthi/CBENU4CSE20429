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



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    getAuthToken(); // Obtain authorization token on server start
});
