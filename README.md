# CBENU4CSE20429
Train Schedule Web Application
This project is a web application that displays real-time train schedules and details using a custom backend API. The application is divided into two main parts: the client and the server.

# Project Structure
Client: This folder contains the frontend part of the web application. It's built using React and Material-UI for styling. The application has two pages, "All Trains" and "Single Train," where users can view train schedules and details.

Server: The backend part of the application is implemented using Node.js. It includes APIs to fetch train schedules and details based on custom conditions(given conditions).

Output: Screenshots of the project are available in this folder. Screenshot of API usage in Postman for the client's API ans Screenshots of the user interface on both mobile and desktop devices.

# Features
Display real-time train schedules with seat availability and pricing information.
User-friendly and responsive UI for both mobile and desktop devices.
Separate APIs for fetching all trains and individual train details.
Trains departing in the next 30 minutes are ignored.
Trains are displayed in the ascending order of price, descending order of tickets, and descending order of departure time (after considering delays in minutes).
Custom styling and design to enhance user experience.

# How to Run
Clone the repository: git clone https://github.com/m2karthi/CBENU4CSE20429
Navigate to the client folder: cd client
Install frontend dependencies: npm install
Start the frontend server: npm start
Open a new terminal window and navigate to the server folder: cd ../server
Install backend dependencies: npm install
Start the backend server: npm start
Access the application in your browser: http://localhost:5000
Screenshots
Screenshots of the API usage and user interface are provided in the "Output" folder.

# Note:
CORS is enabled for https://localhost:3001 port.(you can edit this in server/index.js)

